# JuniorDevInterviewPrep

**IN PROGRESS**

# Description

This is a repo for junior backend developers to practice interview questions and coding challenges.
This is my final exam project for my backend development studies at Noroff School of Technology and Digital Media.
I designed the entire project, and decided to make it a fullstack application.
The frontend is built with React, and the backend is built with Node.js and Express. Users can create an account, and
then log in to access the coding challenges. They have the option to use flashcards created by me as well as create
their own.

# Installation

- Clone the repo
- cd /api
- `npm install` to install dependencies
- cd /client
- `npm start` in the api folder and the client folder.
- The client and api must run on different ports
- Use the .env-example as a template for your own .env file
- Test with Jest before inserting data into the database. (npm test)
- After testing, create your first user, which will be your admin user.
- After creating your admin user, update the user role in /api/routes/auth on at line
83 from "admin" to "member."

# Technologies

- Node.js
- Express
- MySQL
- React
- Jest
- Supertest
- Joi
- JWT
- CodeMirror
- nodeMailer

# Testing

- `npm test` to run all tests

# Sources

- JWT/permissions: https://www.geeksforgeeks.org/basic-authentication-in-node-js-using-http-header/
- Validation using Joi: https://joi.dev/api/?v=17.9.1
- Fullstack: https://www.bezkoder.com/react-node-express-mysql/
- React: https://react.dev/learn/describing-the-ui
- Frontend Login/Signup: https://www.youtube.com/watch?v=brcHK3P6ChQ&t=0s full tutorial
- IDE implementation: https://www.youtube.com/watch?v=wcVxX7lu2d4
- Forgot/Reset password: https://medium.com/geekculture/forgot-password-in-signup-application-with-nodejs-and-mongodb-part-4-51378dddd716
- Technology documentation used for guidance
