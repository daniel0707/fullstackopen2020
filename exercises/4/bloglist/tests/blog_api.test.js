const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const helper = require('./test_helper');
const Blog = require('../models/blog');

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  const blogObjects = helper.manyBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs');
  expect(response.body).toHaveLength(helper.manyBlogs.length);
});

test('the first blog is about React', async () => {
  const response = await api.get('/api/blogs');
  expect(response.body[0].title).toBe('React patterns');
});

test('there is a blog with TDD in title', async () => {
  const response = await api.get('/api/blogs');
  const titles = response.body.map((b) => b.title);
  expect(titles).toContain('TDD harms architecture');
});

test('there should be a Dijkstra with many likes', async () => {
  const response = await api.get('/api/blogs');
  expect(response.body).toEqual(expect.arrayContaining([expect.objectContaining(helper.favBlog)]));
});

afterAll(() => {
  mongoose.connection.close();
});
