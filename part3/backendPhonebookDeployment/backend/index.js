require('dotenv').config();

const http = require('http')
const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')
const Person = require('./models/person')

app.use(express.json())
app.use(cors({origin: 'http://localhost:3000',}))

app.use(express.static('build'));

morgan.token('body', (req) => {
    return req.method === 'POST' ? JSON.stringify(req.body) : ''
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

    app.get('/api/persons/:id', (request, response) => {
        const id = request.params.id; 
        Person.findById(id)
            .then(person => {
                if (person) {
                    response.json(person);
                } else {
                    response.status(404).send({ error: 'Person not found' });
                }
            })
            .catch(error => {
                console.log(error)
                response.status(500).end()
            }) 
    });

    app.get('/api/persons', (request, response) => {
        Person.find({}).then(persons => {
            response.json(persons)
          })
    })

    app.get('/info', (request, response) => {
        Person.countDocuments({})
            .then(numPersons => {
                const currentDate = new Date();
                const responseText = `
                    <p>Phonebook has info for ${numPersons} people</p>
                    <p>${currentDate}</p>
                `;
                response.send(responseText);
            });
    });

    app.delete('/api/persons/:id', (request, response) => {
        const id = request.params.id;
    
        Person.findByIdAndDelete(id)
            .then(deletedPerson => {
                if (deletedPerson) {
                    response.status(204).send({ message: `Person with ID ${id} deleted successfully.` });
                } else {
                    response.status(404).send({ error: `Person with ID ${id} not found.` });
                }
            })
            .catch(error => {
                console.error('Error deleting person:', error);
                response.status(400).send({ error: `Malformatted ID: ${id}` });
            });
    });

    app.post('/api/persons', (request, response) => {
        const body = request.body;
        if (body.name === undefined || body.number === undefined) {
            return response.status(400).json({ error: 'Name or number is missing' })
        }
    
        const person = new Person({
            name: body.name,
            number: body.number,
        });

        person.save().then(savedPerson => {
            response.json(savedPerson)
        })
    });

    const PORT = process.env.PORT
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })