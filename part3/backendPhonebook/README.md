# Backend Phonebook

## Table of Contents

- [Backend Phonebook](#backend-phonebook)
- [About This Repository](#about-this-repository)
- [Routes and Features](#routes-and-features)
- [How to Run the Projects](#how-to-run-the-projects)

## About This Repository

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

## How to Run the Projects

To run the Backend Phonebook application, please follow the instructions in the [Part 3 README](../README.md#how-to-run-the-projects).

<div style="background-color: #ffffff; border-left: 6px solid #2196F3; padding: 10px; color: #000000; margin: 20px 0;">
  <strong>Note:</strong> Use Postman or any REST client to test routes.
</div>
<div style="background-color: #ffffff; border-left: 6px solid #2196F3; padding: 10px; color: #000000; margin: 20px 0;">
  <strong>Note:</strong> Make sure you have Node.js and npm installed before continuing.
</div>
