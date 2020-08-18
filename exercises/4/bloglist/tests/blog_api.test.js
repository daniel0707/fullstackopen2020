const mongoose = require('mongoose');
const supertest = require('supertest');
const _ = require('lodash');
const app = require('../app');
const helper = require('./test_helper');
const Blog = require('../models/blog');
const User = require('../models/user');
const { anonymAuth } = require('./test_helper');

const api = supertest(app);
describe('starting tests and running initial setups', () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
    await User.deleteMany({});
    const blogObjects = helper.manyBlogs.map((blog) => new Blog(blog));
    const userObjects = helper.manyUsers.map((usr) => new User(usr));
    const promiseArray = blogObjects.map((blog) => blog.save());
    promiseArray.concat(userObjects.map((usr) => usr.save()));
    await Promise.all(promiseArray);
  });
  describe('when there are initially some blogs saved', () => {
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

    test('there is a blog with TDD in title', async () => {
      const response = await api.get('/api/blogs');
      const titles = response.body.map((b) => b.title);
      expect(titles).toContain('TDD harms architecture');
    });

    test('there should be a Dijkstra with many likes', async () => {
      const response = await api.get('/api/blogs');
      expect(response.body)
        .toEqual(expect.arrayContaining([expect.objectContaining(helper.favBlog)]));
    });

    test('blog IDs should be without low dash', async () => {
      const response = await api.get('/api/blogs');
      response.body.forEach((blog) => {
        expect(blog.id).toBeDefined();
      });
    });
    describe('creating a blog', () => {
      test('succeeds with valid input', async () => {
        await api
          .post('/api/blogs')
          .set(helper.anonymAuth)
          .send(helper.newBlog)
          .expect(201)
          .expect('Content-Type', /application\/json/);

        const blogsAtEnd = await helper.blogsInDB();
        expect(blogsAtEnd).toHaveLength(helper.manyBlogs.length + 1);
        expect(blogsAtEnd)
          .toEqual(expect.arrayContaining([expect.objectContaining(helper.newBlog)]));
      });

      test('without likes specified will default to 0 likes', async () => {
        const blogWithoutLikes = _.omit(helper.newBlog, 'likes');
        await api
          .post('/api/blogs')
          .set(anonymAuth)
          .send(blogWithoutLikes)
          .expect(201)
          .expect('Content-Type', /application\/json/);

        const blogsAtEnd = await helper.blogsInDB();

        expect(blogsAtEnd).toHaveLength(helper.manyBlogs.length + 1);
        expect(blogsAtEnd)
          .toEqual(expect.arrayContaining([expect.objectContaining(blogWithoutLikes)]));
        expect(blogsAtEnd.find((b) => b.title === 'The Algorithm Design Manual').likes).toEqual(0);
      });

      test('with missing title and or url will not succeed', async () => {
        await api
          .post('/api/blogs')
          .set(anonymAuth)
          .send({ likes: 0 })
          .expect(400);

        await api
          .post('/api/blogs')
          .set(anonymAuth)
          .send({ title: 'test title' })
          .expect(400);

        await api
          .post('/api/blogs')
          .set(anonymAuth)
          .send({ url: 'test url' })
          .expect(400);
      });

      test('will succeed with minimum input - url and title', async () => {
        const resp = await api
          .post('/api/blogs')
          .set(anonymAuth)
          .send({ url: 'test url', title: 'test title' })
          .expect(201);
        expect(resp.body).toEqual(
          expect.objectContaining({
            url: 'test url', title: 'test title', likes: 0, author: null,
          }),
        );
      });
    });

    test('a blog can be deleted and will return 204', async () => {
      const blogsAtStart = await helper.blogsInDB();
      const blogToDelete = blogsAtStart[0];

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204);

      const blogsAfterDelete = await helper.blogsInDB();

      expect(blogsAfterDelete).toHaveLength(blogsAtStart.length - 1);
      expect(blogsAfterDelete.map((b) => b.id)).not.toContain(blogToDelete.id);
      expect(blogsAfterDelete).not.toContain(expect.objectContaining(_.omit(blogToDelete, 'id')));
    });

    test('a blog can be updated', async () => {
      const newBlog = (await api
        .post('/api/blogs')
        .set(helper.anonymAuth)
        .send(helper.newBlog))
        .body;
      const updatedBlog = (await api
        .put(`/api/blogs/${newBlog.id}`)
        .send(
          _.chain(newBlog)
            .set('likes', 20)
            .omit('id')
            .omit('user'),
        )
        .expect(200))
        .body;
      const updatedBlogList = await helper.blogsInDB();
      expect(updatedBlogList)
        .toEqual(expect.arrayContaining([expect.objectContaining(_.omit(updatedBlog, 'user'))]));
    });
  });

  describe('creating a new user', () => {
    test('will succeed with unique username and lengthy password & username', async () => {
      const usersAtStart = await helper.usersInDB();
      await api
        .post('/api/users')
        .send(helper.newUser)
        .expect(201);

      const usersAtEnd = await helper.usersInDB();
      expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);
      expect(usersAtEnd)
        .toEqual(expect.arrayContaining(
          [expect.objectContaining(_.omit(helper.newUser, 'password'))],
        ));
    });

    test('will fail with no password specified', async () => {
      await api
        .post('/api/users')
        .send({ username: 'testerNoPW', name: 'testerNoPW' })
        .expect(400);
    });

    test('will fail with no username specified', async () => {
      await api
        .post('/api/users')
        .send({ name: 'testerNoUsername', password: 'blablabla' })
        .expect(400);
    });

    test('will fail with too short password', async () => {
      await api
        .post('/api/users')
        .send({ name: 'TooShortPassword', username: 'tooShortPassword', password: 'aa' })
        .expect(400);
    });

    test('will fail with too short username', async () => {
      await api
        .post('/api/users')
        .send({ name: 'TooShortUsername', username: 'aa', password: 'TooShortUsername' })
        .expect(400);
    });
  });
});

describe('loging in', () => {
  test('succeeds with corrent credentials', async () => {
    await api
      .post('/api/login')
      .send({ username: 'anonymous', password: 'anonymous' })
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });
  test('fails with wrong password', async () => {
    await api
      .post('/api/login')
      .send({ username: 'anonymous', password: 'wrongPassword' })
      .expect(401)
      .expect('Content-Type', /application\/json/);
  });
  test('fails with non existing user', async () => {
    await api
      .post('/api/login')
      .send({ username: 'n0', password: 'wrongPassword' })
      .expect(401)
      .expect('Content-Type', /application\/json/);
  });
});
afterAll(() => {
  mongoose.connection.close();
});
