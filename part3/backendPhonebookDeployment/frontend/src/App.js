import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personsService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [addPersonMessage, setAddPersonMessage] = useState(null);
  const [isSuccess, setIsSuccess] = useState(true)

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    personsService
        .getAll()
        .then(response => {
          setPersons(response.data);
          setLoading(false);
        })
        .catch(error => {
          setError('Error fetching persons');
          setLoading(false); 
        });
  }, []);
  
  console.log('render', persons.length, 'persons')

  if (loading) {
    return <div>Loading...</div>; 
  }

  if (error) {
    return <div>{error}</div>; 
  }

  const handleNameChange = (event) => setNewName(event.target.value);
  const handleNumberChange = (event) => setNumber(event.target.value);
  const handleFilterChange = (event) => setFilter(event.target.value);
  
  const personsToShow = persons.filter(person => 
    person.name && person.name.toLowerCase().includes(filter.toLowerCase())
  );
  
  const resetForm = () => {
    setNewName('')
    setNumber('')
  }

  const displayNotification = (message, success) => {
    console.log(message)
    console.log(success)

    setAddPersonMessage(message);
    setIsSuccess(success);
    setTimeout(() => {
      setAddPersonMessage(null);
    }, 10000);
  }
  
  const addNewName = (event) => {
    event.preventDefault() 
    const newPerson = { name: newName, number: String(newNumber) } 

    const existingPerson = persons.find(person => person.name === newPerson.name);

    if (existingPerson) {
        updatePerson(existingPerson.id, newPerson)
    } else {
        personsService
            .create(newPerson)
            .then(response => {
                setPersons(persons.concat(response.data));
                displayNotification(`Added ${newPerson.name}`, true);
                resetForm()
            })
            .catch(error => {
                console.log(error.response);
                displayNotification(`Error: ${error.response.data.error}`, false);
            });
    }
}


  const checkSameName = persons.some(person => person.name === newName);

  const updatePerson = (id, newPerson) => {
    if(window.confirm(`${newPerson.name} is already added to phonebook, replace the old number with a new one?`)) {
      personsService
        .update(id, newPerson)
        .then(response => {
            displayNotification(`Modified phone number ${newPerson.name}`, true);
            setPersons(persons.map(p => (p.id !== id ? p : response.data)));
            resetForm()
      })
      .catch(error => {
        console.error("Error updating person:", error);
        displayNotification(`Error updating ${newPerson.name}. It might have been removed from the server.`, false)
      });
    }
  }

  const handleDeleteChange = (id) => {
    const person = persons.find(p => p.id === id)
    if(window.confirm(`Delete ${person.name}?`)) {
      personsService
      .deletePerson(id)
      .then(() => {
        setPersons(persons.filter(p => p.id !== id));
        displayNotification(`Deleted ${person.name}`, true);
      })
      .catch(error => {
        if (error.response && error.response.status === 404) {
          displayNotification(`Information of ${person.name} has already been removed from server`, false)
          setPersons(persons.filter(p => p.id !== id));
        }
      }); 
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={addPersonMessage} isSuccess={isSuccess} />
      <Filter filter={ filter } handleFilterChange={ handleFilterChange }/>
      <h2>Add a new</h2>
      <PersonForm 
        newName = { newName } 
        newNumber = { newNumber } 
        handleNameChange = { handleNameChange } 
        handleNumberChange = { handleNumberChange } 
        addNewName = { addNewName } 
      />
      <h2>Numbers</h2>
      {personsToShow.length > 0 ? (
        <Persons persons={personsToShow} handleDelete={handleDeleteChange} />
      ) : (
        <div>No results found</div>
      )}
    </div>
  )
}

export default App