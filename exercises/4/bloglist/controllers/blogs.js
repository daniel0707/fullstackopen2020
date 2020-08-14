const blogsRouter = require('express').Router();
const _ = require('lodash');
const Blog = require('../models/blog');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({});
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
  const blog = {
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes,
  };
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true });
  response.json(updatedBlog);
});

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

blogsRouter.post('/', async (request, response) => {
  if (!_.has(request.body, 'likes')) request.body.likes = 0;
  const blog = new Blog(request.body);
  const savedBlog = await blog.save();
  response.status(201).json(savedBlog);
});

module.exports = blogsRouter;
