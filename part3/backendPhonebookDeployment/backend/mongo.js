// require('dotenv').config();

const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('Give password as argument')
  process.exit(1)
} else if (process.argv.length<5){
    console.log('Give name and number as argument')
    process.exit(1)
}

const password = process.env.MONGODB_PASSWORD
const userName = process.env.MONGODB_USER
const db = process.env.MONGODB_DB

const url =
  `mongodb+srv://${userName}:${password}@cluster0.bjpvt.mongodb.net/${db}?retryWrites=true&w=majority&appName=Cluster0`
  
mongoose.set('strictQuery',false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Persons', personSchema)

if (process.argv.length > 3){
    const name = process.argv[3]
    const number = process.argv[4]

    
    const person = new Person({
      name: name,
      number: number,
    })
    
    person.save().then(result => {
        console.log(`Added ${name} ${number} to phonebook`)
        mongoose.connection.close()
      })
} else {
    console.log("Phonebook:")
    Person.find({}).then(result => {
        result.forEach(person => {
          console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
      })
}