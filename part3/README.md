# Programming a server with NodeJS and Express

## Table of Contents

- [Programming a server with NodeJS and Express](#programming-a-server-with-nodejs-and-express)
- [About This Repository](#about-this-repository)
- [Available Applications](#available-applications)
- [How to Run the Projects](#how-to-run-the-projects)

## About This Repository

In this repository, we focus on the backend of the application, implementing a simple REST API using Node.js and the Express library. In addition to the use of the MongoDB database.

## Available Applications

1. [Backend Phonebook](./backendPhonebook)  
    - This application provides a backend for a phonebook.

2. [Backend Phonebook Deployment](./backendPhonebookDeployment) 
    - This application demonstrates how to deploy the phonebook backend to a server.

## How to Run the Projects

Follow these steps to set up and run the project:

1. **Clone the Repository:**
   If you haven't already cloned the main repository, you can do so by running:
   ```bash
   git clone https://github.com/SeleneGonzalezCurbelo/Course-Full-Stack-Open.git
2. **Navigate to the Part 3 Directory:**
   ```bash
   cd Course-Full-Stack-Open/part3
3. **Move to the Specific Project Directory (choose one):**
    ```bash
   cd backendPhonebook
4. **Install Project Dependencies: Make sure you have Node.js and npm installed. Then, run:**
    ```bash
    npm install
5. **Start the Backend:** To start the backend server in development mode, run:
    ```bash
    npm run dev    
The backend will be running on port 3001.

6. **Start the Frontend:** You can start it with::
    ```bash
    npm run start
The frontend will be available on port 3000.

7. **Access the Application:** Access the Application: Once both servers are running, you can access the frontend at: http://localhost:3000. The backend will be available at: http://localhost:3001.

## Next Project 

 - Proceed to Part 4: [Testing Express servers, user administration](../part4/)