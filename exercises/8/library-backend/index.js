const { ApolloServer, UserInputError, gql, AuthenticationError, PubSub } = require('apollo-server')
const _ = require('lodash')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
const DatLoader = require('dataloader')

mongoose.set('debug',true)
require('dotenv').config()
const pubsub = new PubSub()
mongoose.set('useFindAndModify', false)

const MONGODB_URI = process.env.MONGODB_URI
const JWT_SECRET ="NOT_A_SECRET"
mongoose.set('useCreateIndex', true)

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = gql`
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  type Token {
    value: String!
  }
  type Book {
    id: ID!
    title: String!
    author: Author!
    published: Int!
    genres: [String!]!
  }
  type Author {
    id: ID!
    name: String
    born: Int
    books: Int!
  }
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author:String, genre:String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }
  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book!
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }
  type Subscription {
    bookAdded: Book!
  }
`

const authorBookCountLoader = new DatLoader(async (authorIDs) => {
  const allBooks = await Book.find({})
  const authorBookCountMap = _.countBy(allBooks, 'author')
  return authorIDs.map(a=>authorBookCountMap[a])
})

const fetchUser = async (req) => {
  const auth = req ? req.headers.authorization : null
  if (auth && auth.toLowerCase().startsWith('bearer ')) {
    const decodedToken = jwt.verify(
      auth.substring(7), JWT_SECRET
    )

    const currentUser = await User
      .findById(decodedToken.id).populate('friends')

    return currentUser
  }else return null
}

const resolvers = {
  Query: {
    bookCount: async () => await Book.collection.countDocuments(),
    authorCount: async () => await Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (_.isEmpty(args)) {
        return Book.find().populate('author')
      }
      let agg = [
        {
          $lookup: {
            from: 'authors',
            localField: 'author',
            foreignField: '_id',
            as: 'author'
          }
        },
        {
          $unwind: '$author'
        },
        { // aggregate needs manual ID translation
          $set: {
            id: {
              $toString: "$_id"
            }
          }
        },
        { // remove remaining object after translation
          $unset: "_id"
        }
      ]
      if (args.author) {
        agg.push({
          $match: {
            'author.name':args.author
          }
        })
      }
      if (args.genre) {
        agg.push({
          $match: {
            'genres': args.genre
          }
        })
      }
      const result = await Book.aggregate(agg).exec()
      return result
      //return Book.aggregate(agg).exec()
    },
    allAuthors: async() => await Author.find({}),
    me: (root, args, context) => {
      return context.currentUser
    }
  },
  Author: {
    books: async (root, args, { loaders }) => {
      return await loaders.books.load(root.id)
      //Book.countDocuments({ 'author': mongoose.Types.ObjectId(parent._id) })
    }
  },
  Mutation: {
    addBook: async (root, args, context, info) => {
      if (!context.currentUser) {
        throw new AuthenticationError("not authenticated")
      }
      const session = await mongoose.startSession()
      session.startTransaction()
      try {
        const author = await Author.findOneAndUpdate(
          { name: args.author },
          { name: args.author },
          { upsert: true, new: true, runValidators: true, session:session }
        ).exec()
        const newBook = new Book({ ...args, author: author._id })
        let res = await newBook.save({ session: session })
        res = await res.execPopulate('author')
        await session.commitTransaction()
        session.endSession()
        pubsub.publish('BOOK_ADDED',{bookAdded: res})
        return res
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }
    },
    editAuthor: async (root, args, context) => {
      if (!context.currentUser) {
        throw new AuthenticationError("not authenticated")
      }
      try {
        return await Author.findOneAndUpdate(
          { name: args.name },
          { born: args.setBornTo },
          { new: true, runValidators: true}
        ).exec()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }
    },
    createUser: (root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })
  
      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })
    }, 
    login: async (root, args) => {
      const users = await User.find({})
      const user = await User.findOne({ username: args.username })
  
      if ( !user || args.password !== 'secret' ) {
        throw new UserInputError("wrong credentials")
      }
  
      const userForToken = {
        username: user.username,
        id: user._id,
      }
  
      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const loaders = {books: authorBookCountLoader}
    const currentUser = fetchUser(req)
    return currentUser? {currentUser, loaders} : {loaders}
  }  
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})