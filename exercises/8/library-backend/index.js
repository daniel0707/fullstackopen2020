const { ApolloServer, UserInputError, gql, AuthenticationError } = require('apollo-server')
const _ = require('lodash')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')

require('dotenv').config()

mongoose.set('useFindAndModify', false)

const MONGODB_URI = process.env.MONGODB_URI
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
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: (root, args) => {
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
      return Book.aggregate(agg).exec()
    },
    allAuthors: () => Author.find({})
  },
  Author: {
    books: (parent) => {
      return Book.countDocuments({ 'author': mongoose.Types.ObjectId(parent._id) })
    }
  },
  Mutation: {
    addBook: async(root,args,context,info) => {
      const author = await Author.findOneAndUpdate(
        { name: args.author },
        { name: args.author },
        { upsert: true, new: true, runValidators: true }
      )
      const newBook = new Book({ ...args, author: author._id })
      return (await newBook.save()).populate('author').execPopulate()
    },
    editAuthor: async(root, args) => {
      return Author.findOneAndUpdate(
        { name: args.name },
        { born: args.setBornTo },
        { new: true, runValidators: true}
      )
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})