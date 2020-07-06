const express = require('express')
const app = express()
const morgan = require('morgan')

morgan.token('body', function (req, res) { return JSON.stringify(req.body) })
app.use(express.json())
app.use(express.static('build'))
app.use(morgan(':method :url :status :req[content-length] :response-time ms :body'))

let persons = [
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
]

const generateId = () => {
    return Math.random() * 10000000000000000
}

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/info', (req, res) => {
    const d = new Date()
    res.send(`<p>Phonebook has infor for ${persons.length} people</p><p>${d}</p>`)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(p => p.id === id)
    if (person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    if (persons.some(p => p.id === id)) {
        persons = persons.filter(p => p.id !== id)
        res.status(204).end()
    } else {
        res.status(404).end()
    }
})

app.post('/api/persons', (req, res) => {
    if (!req.body.name) {
        res.status(400).send({ error: "Name missing" })
    } else if (!req.body.number) {
        res.status(400).send({ error: "Number missing" })
    } else if (persons.some(p => p.name === req.body.name)) {
        res.status(400).send({ error: `${req.body.name} already exists in phonebook` })
    } else {
        const p = {
            "name": req.body.name,
            "number": req.body.number,
            "id": generateId()
        }
        persons.push(p)
        res.status(201).send(p)
    }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})