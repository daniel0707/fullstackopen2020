const blogsRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const Blog = require('../models/blog');
const User = require('../models/user');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, _id: 1 });
  response.json(blogs);
});

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id).populate('user', { username: 1, name: 1, _id: 1 });
  if (blog) {
    response.json(blog);
  } else {
    response.status(404).end();
  }
});

blogsRouter.put('/:id', async (request, response) => {
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, request.body, { new: true }).populate('user', { username: 1, name: 1, _id: 1 });
  response.json(updatedBlog);
});

blogsRouter.delete('/:id', async (request, response) => {
  if (!_.has(request, 'token')) {
    return response.status(401).json({ error: 'token missing!' });
  }
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' });
  }
  const user = await User.findById(decodedToken.id);
  const blogToDelete = await Blog.findById(request.params.id);

  if (user._id.toString() === blogToDelete.user._id.toString()) {
    await Blog.findByIdAndRemove(request.params.id);
    response.status(204).end();
  } else {
    response.status(401).send({ error: 'Unauthorized!' });
  }
});

blogsRouter.post('/', async (request, response) => {
  if (!_.has(request, 'token')) {
    return response.status(401).json({ error: 'token missing!' });
  }
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' });
  }
  const user = await User.findById(decodedToken.id);
  const blog = new Blog(_.set(request.body, 'user', user._id));
  const savedBlog = await blog.save().populate('user', { username: 1, name: 1, _id: 1 });
  response.status(201).json(savedBlog);
});

module.exports = blogsRouter;
