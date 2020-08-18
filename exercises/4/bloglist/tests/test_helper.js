const Blog = require('../models/blog');
const User = require('../models/user');

const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 12,
    __v: 0,
  },
];

const newBlog = {
  title: 'The Algorithm Design Manual',
  author: 'Steven Skienna',
  url: 'http://www.algorist.com/',
  likes: 9,
};

const favBlog = {
  title: 'Go To Statement Considered Harmful',
  author: 'Edsger W. Dijkstra',
  likes: 12,
};
const manyUsers = [
  {
    _id: '5f3bbe1c7c12c929f0fe513f', blogs: [{ _id: '5a422a851b54a676234d17f7' }, { _id: '5a422aa71b54a676234d17f8' }], username: 'testerOne', name: 'tester One', passwordHash: '$2b$10$xWfTkqp5giOO5by3jsqI6O/8JvLtXgKh60BxYOGaoZzrjZFuwr/0i', __v: '0',
  },
  {
    _id: '5f3bbec41b47b70ca01c4d8e', blogs: [{ _id: '5a422b891b54a676234d17fa' }], username: 'testerTwo', name: 'tester Two', passwordHash: '$2b$10$0TPS1wsqBR/AU7Q/4Po48e4QtICJV/e6SkvyK8ZkbPc6Ux4UJolYe', __v: '0',
  },
  {
    _id: '5f3bfedd25e91f7b7c43f8b1', blogs: [], username: 'anonymous', name: 'anonymous', passwordHash: '$2b$10$C3iaqIG2XCqR4tTehCgdG.cC4iE8V7RaWbiTvfnogYAnch6oYvOQ6', __v: '0',
  },
];

const manyBlogs = [{
  _id: '5a422a851b54a676234d17f7', user: { _id: '5f3bbe1c7c12c929f0fe513f' }, title: 'React patterns', author: 'Michael Chan', url: 'https://reactpatterns.com/', likes: 7, __v: 0,
}, {
  _id: '5a422aa71b54a676234d17f8', user: { _id: '5f3bbe1c7c12c929f0fe513f' }, title: 'Go To Statement Considered Harmful', author: 'Edsger W. Dijkstra', url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html', likes: 12, __v: 0,
}, {
  _id: '5a422b3a1b54a676234d17f9', user: { _id: '5f3bd3a6d0012f5de032d157' }, title: 'Canonical string reduction', author: 'Edsger W. Dijkstra', url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html', likes: 5, __v: 0,
}, {
  _id: '5a422b891b54a676234d17fa', user: { _id: '5f3bbec41b47b70ca01c4d8e' }, title: 'First class tests', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll', likes: 10, __v: 0,
}, {
  _id: '5a422ba71b54a676234d17fb', user: { _id: '5f3bd3a6d0012f5de032d157' }, title: 'TDD harms architecture', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html', likes: 0, __v: 0,
}, {
  _id: '5a422bc61b54a676234d17fc', user: { _id: '5f3bd3a6d0012f5de032d157' }, title: 'Type wars', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html', likes: 2, __v: 0,
},
];

const newUser = {
  username: 'proper tester',
  name: 'tester',
  password: 'lengthypassword',
};

const blogsInDB = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};
const usersInDB = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

module.exports = {
  listWithOneBlog,
  manyBlogs,
  manyUsers,
  favBlog,
  newBlog,
  blogsInDB,
  usersInDB,
  newUser,
};
