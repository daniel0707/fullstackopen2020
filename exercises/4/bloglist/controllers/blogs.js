const blogsRouter = require('express').Router();
const _ = require('lodash');
const Blog = require('../models/blog');
const User = require('../models/user');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, _id: 1 });
  response.json(blogs);
});

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  if (blog) {
    response.json(blog);
  } else {
    response.status(404).end();
  }
});

blogsRouter.put('/:id', async (request, response) => {
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, request.body, { new: true });
  response.json(updatedBlog);
});

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

blogsRouter.post('/', async (request, response) => {
  if (!_.has(request.body, 'user')) {
    request.body.user = (await User.find({}))[0]._id;
  }
  console.log(request.body);

  const blog = new Blog(request.body);
  const savedBlog = await blog.save();
  response.status(201).json(savedBlog);
});

module.exports = blogsRouter;
