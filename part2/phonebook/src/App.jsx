import { useState } from 'react'
import { useEffect } from 'react'
import personService from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameToFilter, setNameToFilter] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    const checkPerson = persons.some(person => person.name.toLowerCase() == newName.toLowerCase())
    const checkNumber = persons.some(number => number.number === newNumber)

    //Check if the name and number are valid entries
    if (checkPerson) {
      //Check if the the user wants to replace the number of the name
      if (window.confirm(`${newName} is already added to the phonebook. Do you want to replace the old number with the one you just typed?`)) {
        //First, look for the element with the same name and store it in a const
        const personToChange = persons.find(person => person.name.toLowerCase() == newName.toLowerCase())

        //Then copy it in a new variable. the ... means that it's copying every propertie of the personToChange object, save for number, which is being replaced by newNumber
        const updatedPerson = { ...personToChange, number: newNumber }

        //Checking if we got the right element (we did! :) )
        /* console.log(personToChange.id)
        console.log(updatedPerson.id)         */

        //Now, let's call the server to "insert" the newly created updated person
        personService
          .add(personToChange.id, updatedPerson)
          .then(response => {
            //Log to check if it's getting the object correctly (it is :) )
            //console.log(response)
            setPersons(persons.map(person => {
              //now we iterate to replace ONLY the updated person using it's id to identify him (or her). We use map because we need to create a whole new array to update the state
              if (person.id === personToChange.id) {
                return response.data
              } else {
                return person
              }

              //we could also:
              //setPersons(persons.map(p => p.id !== personToChange.id ? p : response.data))
            })
            )
          }
          )
      }
    } else if (checkNumber) {
      alert(`That number is already registered!`)
    } else {
      const personObject = {
        name: newName,
        number: newNumber
      }
      personService
        .create(personObject)
        .then(response => {
          console.log(response)
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNameToFilter(event.target.value)
  }

  const handleEraseButton = (id, name) => {
    console.log(`Deleted: ${id}`);
    if (window.confirm(`Delete ${name}?`)) {
      personService
        .erase(id)
        .then(
          setPersons(() => persons.filter(p => p.id !== id))
        )
    } else {
      console.log('Phonebook remains the same!')
    }
  }

  const filteredNumbers = () => {
    if (nameToFilter === '') {
      return persons
    } else {
      return persons.filter(person =>
        person.name.toLowerCase().includes(nameToFilter.toLowerCase())
      )
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter nameToFilter={nameToFilter} handleFilterChange={handleFilterChange} />

      <h2>add a new person</h2>

      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />

      <h2>Numbers</h2>

      <Persons
        filteredNumbers={filteredNumbers}
        handleEraseButton={handleEraseButton} />
    </div >
  )
}

export default App