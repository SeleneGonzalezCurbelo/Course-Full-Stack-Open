const http = require('http')

const express = require('express')
const morgan = require('morgan')
const app = express()

app.use(express.json())

morgan.token('body', (req) => {
    return req.method === 'POST' ? JSON.stringify(req.body) : ''
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    },
    { 
        "id": 5,
        "name": "S S", 
        "number": "4-23-6423122"
      }
]

    app.get('/api/persons/:id', (request, response) => {
        const id = Number(request.params.id)
        const person = persons.find(person => person.id === id)
        if (person) {
            response.json(person) 
        } else {
            response.status(404).send({ error: 'Person not found' }) 
        }
    })

    app.get('/api/persons', (request, response) => {
        response.json(persons)
    })

    app.get('/info', (request, response) => {

        const numPersons = persons.length
        const currentDate = new Date()
        const responseText = `
            <p>Phonebook has info for ${numPersons} people</p>
            <p>${currentDate}</p>
        `
        response.send(responseText)
    })

    app.delete('/api/persons/:id', (request, response) => {
        const id = Number(request.params.id)
        persons = persons.filter(person => person.id !== id)
      
        response.status(204).end()
    })

    app.post('/api/persons', (request, response) => {
        const body = request.body        

        if (!body.name || !body.number) {
            return response.status(400).json({ 
                error: 'Name or number is missing' 
            })
        }

        if (persons.find(person => person.name == body.name)){
            return response.status(400).json({ 
                error: 'Name must be unique' 
            })
        }

        const newId = Math.floor(Math.random() * 10000)
        
        const newPerson = {
            id: newId,
            name: body.name,
            number: body.number
        }

        persons = persons.concat(newPerson)

        response.json(newPerson)
    })

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)