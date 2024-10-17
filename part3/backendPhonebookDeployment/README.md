# Backend Phonebook Deployment

This project consists of a contact management application where users can create, edit and delete contact information.

## Table of Contents

- [Backend Phonebook Deployment](#backend-phonebook-deployment)
- [About This Repository](#about-this-repository)
- [How to Run the Projects](#how-to-run-the-projects)
- [Data Validations](#data-validations)
- [Access the Application](#access-the-application)

## About This Repository

- **Deployment:** The application has been deployed in Render for easy online access.
- **Database:** The backend of the application is connected to a MongoDB database, allowing contacts to be stored persistently.
- **Validations:** The backend has validations to ensure that the data entered by users is correct, such as validating the format of phone numbers.
- **ESLint:** The code has been verified with ESLint, a tool that helps keep code clean and free of common errors

## How to Run the Projects

- **Local:** To run the Phonebook application, please follow the instructions in the [Part 3 README](../README.md#how-to-run-the-projects).
- **Online:** If you prefer to use the version deployed in Render, access the frontend go to [Access the Application](#access-the-application)

<div style="background-color: #ffffff; border-left: 6px solid #2196F3; padding: 10px; color: #000000; margin: 20px 0;">
  <strong>Note:</strong> Make sure you have Node.js and npm installed before continuing.
</div>

## Data Validations

- **Name:**
  - It must be at least 3 characters long.
- **Phone number:** 
  - Must be 8 or more characters.
  - It must be in the format XX-XXXXXXXX or XXX-XXXXXXXX, where:
    - The first part is 2 or 3 digits long.
    - The second part is just numbers.
    - Valid Examples:
      - 09-1234556
      - 040-22334455


## Access the Application

You can access the deployed phonebook application at the following URL: [Phonebook Application](https://course-full-stack-open.onrender.com)