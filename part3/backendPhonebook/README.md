# Backend Phonebook

This repository contains a simple backend application implemented in Node.js using Express. It allows you to manage a phone book, where you can add, delete and consult contact entries.

## Routes and Features

- **GET /api/persons**
  - Shows all phone book contacts.

- **GET /api/persons/:id**
  - Shows information for a specific contact based on their ID

- **POST /api/persons**
  - Add a new user to the calendar
  - **Note:** A user can only be added if:
    - The name and number are provided.
    - The name does not already exist in the phonebook.

- **DELETE /api/persons/:id**
  - Delete a user from the calendar

- **GET /info**
  - Displays information about the number of contacts in the phonebook and the time the request was made.
    
## Note
   - Use Postman or any REST client to test routes.
