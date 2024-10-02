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

## How to use

Follow these steps to set up and run the project:

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/SeleneGonzalezCurbelo/Course-Full-Stack-Open/part3
2. **Navigate to the Project Directory**
   ```bash
   cd  || cd  || cd 
4. **Install Node.js**
5. **Install npm**. You can verify the installation by running: 
    ```bash
    npm -v
6. **Install Project Dependencies**: 
    ```bash
    npm install
7. **Start the Application**: To run the application in development mode, use:
     ```bash
     npm run start
8. **Start the Application que permite reiniciar el servidor**: 
     ```bash
     npm run dev
The application will be accessible at http://localhost:3001/api/persons

## Note
   - Use Postman or any REST client to test routes.