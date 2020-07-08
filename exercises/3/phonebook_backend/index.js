const express = require('express')
const app = express()
const morgan = require('morgan')
const Person = require('./models/person')
const { response } = require('express')
require('dotenv').config()

morgan.token('body', function (req, res) { return JSON.stringify(req.body) })
app.use(express.json())
app.use(express.static('build'))
app.use(morgan(':method :url :status :req[content-length] :response-time ms :body'))

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }

    next(error)
}
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
    Person.find({}).then(people => {
        res.json(people)
    })
        .catch(error => next(error))

})

app.get('/info', (req, res, next) => {
    const d = new Date()
    Person.find({}).then(people => {
        res.send(`<p>Phonebook has infor for ${people.length} people</p><p>${d}</p>`)
    })
        .catch(error => next(error))

})

app.get('/api/persons/:id', (req, res, next) => {
    Person.findById(req.params.id).then(person => {
        if (person) {
            res.json(person)
        } else {
            res.status(404).end()
        }
    })
        .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
    Person.findByIdAndDelete(req.params.id)
        .then(result => {
            res.status(204).end()
        })
        .catch(error => next(error))
})

app.post('/api/persons', (req, res, next) => {
    if (!req.body.name) {
        res.status(400).send({ error: "Name missing" })
    } else if (!req.body.number) {
        res.status(400).send({ error: "Number missing" })
        /*     } else if (persons.some(p => p.name === req.body.name)) {
                res.status(400).send({ error: `${req.body.name} already exists in phonebook` }) */
    } else {
        const p = new Person({
            "name": req.body.name,
            "number": req.body.number,
        })
        p.save()
            .then(savedPerson => res.json(savedPerson))
            .catch(error => next(error))
    }
})

app.put('/api/persons/:id', (req, res, next) => {
    const person = {
        "name": req.body.name,
        "number": req.body.number
    }
    Person.findByIdAndUpdate(req.params.id, person, { new: true })
        .then(updatedPerson => {
            res.json(updatedPerson)
        })
        .catch(error => next(error))
})


const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})