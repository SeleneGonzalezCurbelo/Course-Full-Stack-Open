require('dotenv').config();

const http = require('http')
const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')
const Person = require('./models/person')

app.use(express.json())
app.use(express.static('build'));
app.use(cors());

morgan.token('body', (req) => {
    return req.method === 'POST' ? JSON.stringify(req.body) : ''
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

    app.get('/api/persons/:id', (request, response, next) => {
        const id = request.params.id; 
        Person.findById(id)
            .then(person => {
                if (person) {
                    response.json(person);
                } else {
                    response.status(404).send({ error: 'Person not found' });
                }
            })
            .catch(error => next(error)) 
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

    app.delete('/api/persons/:id', (request, response, next) => {
        const id = request.params.id;
    
        Person.findByIdAndDelete(id)
            .then(deletedPerson => {
                if (deletedPerson) {
                    response.status(204).send({ message: `Person with ID ${id} deleted successfully.` });
                } else {
                    response.status(404).send({ error: `Person with ID ${id} not found.` });
                }
            })
            .catch(error => next(error)) 
    });

    app.put('/api/persons/:id', (request, response, next) => {

        const { name, number } = request.body;

        if (!name || !number) {
            return response.status(400).json({ error: 'Name or number is missing' });
        }

        const id = request.params.id;
        const updatedPerson = request.body;
        
        Person.findByIdAndUpdate(id, updatedPerson, { new: true, runValidators: true, context: 'query' })
            .then(updatedPerson => {
                if (updatedPerson) {
                    response.json(updatedPerson);
                } else {
                    response.status(404).send({ error: 'Person not found' });
                }
            })
            .catch(error => {
                if (error.name === 'ValidationError') {
                    return response.status(400).json({ error: error.message });
                }
                next(error);
            });
    });

    app.post('/api/persons', (request, response, next) => {
        console.log("Incoming POST request body:", request.body); 
    
        const body = request.body;
        if (!body.name || !body.number) {
            return response.status(400).json({ error: 'Name or number is missing' });
        }
        
        const person = new Person({
            name: body.name,
            number: body.number,
        });
    
        person.save()
            .then(savedPerson => response.json(savedPerson))
            .catch(error => {
                console.error('Error during saving person:', error); 
                if (error.name === 'ValidationError') {
                    return response.status(400).json({ error: error.message });
                }
                next(error);
            });
    });
    

    
    const errorHandler = (error, request, response, next) => {
        console.error(error.message);
        
        if (error.name === 'CastError') {
            return response.status(400).send({ error: 'Malformatted id' });
        } else if (error.name === 'ValidationError') {
            console.log('Validation Error Details:', error); 
            return response.status(400).json({ error: error.message });
        }
    
        next(error);
    }
    
    app.use(errorHandler)
    app.use((error, request, response, next) => {
        console.error(error.message);
        if (error.name === 'ValidationError') {
            return response.status(400).json({ error: error.message });
        }
        next(error); 
    });
    
    const PORT = process.env.PORT
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })