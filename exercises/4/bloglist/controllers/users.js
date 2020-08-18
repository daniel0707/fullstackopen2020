const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const _ = require('lodash');
const User = require('../models/user');

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({}).populate('blogs', {
      url: 1, author: 1, title: 1, _id: 1,
    });
  response.json(users.map((u) => u.toJSON()));
});

usersRouter.post('/', async (request, response) => {
  const { body } = request;
  if (!_.has(body, 'password')) {
    return response.status(400).send({ error: 'Password missing!' });
  }
  if (_.lt(body.password.length, 3)) {
    return response.status(400).send({ error: 'Password must be at least 3 characters long!' });
  }
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);

  const user = new User({
    username: body.username,
    name: body.name || null,
    passwordHash,
  });

  const savedUser = await user.save();

  response.status(201).json(savedUser);
});

module.exports = usersRouter;
