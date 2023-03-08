# **NC Games Backend Project!**

## Description

This is a REST API backend project for a game review database. The API allows users to perform various CRUD (Create, Read, Update, Delete) operations on game reviews and other related resources. The API is built using Node.js, Express, and PostgreSQL.

## Installation

Clone the repository to your local machine:

1. Copy code (green code button and copy the url)

2. Paste into terminal: `git clone <url>`

## Install the dependencies:

`cd be-nc-games`
`npm install`

## Setting up the database

1. Create two PostgreSQL databases, one for development and one for testing.

2. Create a .env.development file and a .env.test file in the project root directory.

3. In each of these files, add the following:

PGDATABASE=<name_of_your_development_database>

## Seed the development database with data:

`npm run setup-dbs`

## Running the tests

To run the tests, execute the following command:

`npm test`

## Starting the server

To start the server, execute the following commands:

`npm start`

## Minimum versions of Node.js and PostgreSQL

This project requires:

- Node.js version 14.0.0 or later
- PostgreSQL version 10.0 or later.

## Link to hosted version

[Hosted version!](https://mairi-games-api.onrender.com/)

## Additional resources

Express documentation
PostgreSQL documentation
Jest documentation
