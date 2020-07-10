const express = require('express');
const morgan = require('morgan');
const Person = require('./models/person');
require('dotenv').config();

const app = express();

morgan.token('body', (req) => JSON.stringify(req.body));
app.use(express.json());
app.use(express.static('build'));
app.use(morgan(':method :url :status :req[content-length] :response-time ms :body'));

const errorHandler = (error, request, response, next) => {
  console.error(error.message);
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  } if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  }
  next(error);
};
/* let persons = [
    {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": 1
    },
    {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": 2
    },
    {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": 3
    },
    {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": 4
    }
] */

app.get('/api/persons', (req, res, next) => {
  Person.find({}).then((people) => {
    res.json(people);
  })
    .catch((error) => next(error));
});

app.get('/info', (req, res, next) => {
  const d = new Date();
  Person.find({}).then((people) => {
    res.send(`<p>Phonebook has infor for ${people.length} people</p><p>${d}</p>`);
  })
    .catch((error) => next(error));
});

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id).then((person) => {
    if (person) {
      res.json(person);
    } else {
      res.status(404).end();
    }
  })
    .catch((error) => next(error));
});

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(204).end();
    })
    .catch((error) => next(error));
});

app.post('/api/persons', (req, res, next) => {
  if (!req.body.name) {
    res.status(400).send({ error: 'Name missing' });
  } else if (!req.body.number) {
    res.status(400).send({ error: 'Number missing' });
  } else {
    const p = new Person({
      name: req.body.name,
      number: req.body.number,
    });
    p.save()
      .then((savedPerson) => res.json(savedPerson))
      .catch((error) => next(error));
  }
});

app.put('/api/persons/:id', (req, res, next) => {
  const person = {
    name: req.body.name,
    number: req.body.number,
  };
  Person.findByIdAndUpdate(req.params.id, person, { new: true, runValidators: true, context: 'query' })
    .then((updatedPerson) => {
      res.json(updatedPerson);
    })
    .catch((error) => next(error));
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

app.use(unknownEndpoint);
app.use(errorHandler);

const { PORT } = process.env;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
