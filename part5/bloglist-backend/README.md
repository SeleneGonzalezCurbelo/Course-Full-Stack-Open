# Backend Blog List

## Table of Contents

- [Blog List](#blog-list)
- [About This Repository](#about-this-repository)
- [How to Run the Projects](#how-to-run-the-projects)
- [Running Tests](#running-tests)
- [Authentication and Authorization](#authentication-and-authorization)
- [API Routes](#api-routes)

## About This Repository

A blog list application where users can save information about blogs. For each blog, the following data will be stored: author, title, URL and the number of positive votes received.

The development includes:
- Testing
- Authentication and Authorization
- Legacy Testing with Jest

## How to Run the Projects

To run the Backend Blog List application, please follow the instructions in the [Part 4 README](../README.md#how-to-run-the-projects).

<div style="background-color: #ffffff; border-left: 6px solid #2196F3; padding: 10px; color: #000000; margin: 20px 0;">
  <strong>Note:</strong> Make sure you have Node.js and npm installed before continuing.
</div>

## Running Tests

To execute the tests for the Blog List application, use the following commands:

- For Blog API tests:
  ```bash
  npm test -- tests/blog_api_test.js
- For User API tests:
  ```bash
  npm test -- tests/user_api_test.js
If you wish to run the legacy tests using Jest, you can do so with the following command:
  - ```bash
    npm test
This will run all Jest tests contained in the project.

## Authentication and Authorization

Login restrictions have been implemented. When adding a blog, it will be linked to the user who created it, and only that user will be able to delete the blog. This has been enforced through token-based authentication.

## API Routes
To interact with the Blog List application, you can use the following API routes:
- Get Users:
  ```bash
  GET http://localhost:3001/api/users
- Get Blogs:
  ```bash
  GET http://localhost:3001/api/blogs
- Login:
  ```bash
  POST http://localhost:3001/api/login
- Create Blog:
  ```bash
  POST http://localhost:3001/api/blogs
- Update Blog:
  ```bash
  PUT http://localhost:3001/api/blogs/:id
- Delete Blog:
  ```bash
  DELETE http://localhost:3001/api/blogs/:id