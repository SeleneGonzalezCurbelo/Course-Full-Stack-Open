const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')
const morgan = require('morgan')

mongoose.set('strictQuery', false)

logger.info('connecting to', config.MONGODB_URI)
console.log('Iniciando servidor...')

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
    console.log('Connected to MongoDB') 
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
    console.log('NOOOO Connected to MongoDB') 
  })

app.use(cors())
app.use(morgan('dev'))
//app.use(express.static('dist'))
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)

app.use('/api/login', loginRouter)
app.use('/api/users', usersRouter)
app.use('/api/blogs', middleware.userExtractor, blogsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app