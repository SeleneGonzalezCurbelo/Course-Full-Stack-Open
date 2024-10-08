# Backend Phonebook Deployment

This project consists of a contact management application where users can create, edit and delete contact information.

## Table of Contents

- [Backend Phonebook Deployment](#backend-phonebook-deployment)
- [About This Repository](#about-this-repository)
- [How to Run the Projects](#how-to-run-the-projects)
  - [Install](#install)
- [Access the Application](#access-the-application)

## About This Repository

- **Deployment:** The application has been deployed in Render for easy online access.
- **Database:** The backend of the application is connected to a MongoDB database, allowing contacts to be stored persistently.
- **Validations:** The backend has validations to ensure that the data entered by users is correct, such as validating the format of phone numbers.
- **ESLint:** The code has been verified with ESLint, a tool that helps keep code clean and free of common errors

## How to Run the Projects

- **Local:** To run the Phonebook application, please follow the instructions in the [Part 3 README](../README.md#how-to-run-the-projects).
- **Online:** If you prefer to use the version deployed in Render, access the frontend go to [Access the Application](#access-the-application)

### Install
- Make sure to install the required packages by running the following commands in the project directory:
  ```bash
  npm install express
  npm install --save-dev nodemon
  npm install morgan
  npm install axios
  npm install mongoose
  npm install dotenv
  npm install eslint --save-dev
<div style="background-color: #ffffff; border-left: 6px solid #2196F3; padding: 10px; color: #000000; margin: 20px 0;">
  <strong>Note:</strong> Make sure you have Node.js and npm installed before continuing.
</div>

## Access the Application

You can access the deployed phonebook application at the following URL: [Phonebook Application](https://course-full-stack-open.onrender.com)