# End-to-End (E2E)

This repository contains end-to-end (E2E) tests for a blog list management project. The tests use Cypress to verify the complete functionality of the application from frontend to backend.

## Table of Contents

- [End-to-End (E2E)](#end-to-end-(e2e))
- [About This Repository](#about-this-repository)
- [Testing](#testing)

## About This Repository

This repository contains only E2E tests for the blog listing application, using Cypress as a testing tool. Blog List App Includes:

- Backend: Provides the API to manage blogs and users, supporting authentication, blog storage, and CRUD operations.
- Frontend: A React application that allows users to view, create, update, and delete blogs, as well as authenticate to the application.

## Testing

To run the tests, follow these steps:
1. Start Backend and Frontend

Make sure you have the backend and frontend of the application up and running before launching Cypress.
- Start the backend with the command:
  ```bash
  npm run start:test
- Start the frontend with the command:
  ```bash
  npm run dev
2. Start Cypress
 
When both the backend and frontend are running, we can start Cypress with the following command:
  - ```bash
    npm run cypress:open
This command will open the Cypress interface. Once opened, follow these steps to run the E2E tests:
- Cypress will display a menu asking what type of test you want to run. Select "E2E Testing".
- Next, select a browser (for example, Chrome) that you want to run the tests on.
3. Run a Test

Running the test will show how the application behaves in real time, reflecting the interaction with the frontend and the responses from the backend.