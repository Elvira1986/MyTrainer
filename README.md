# MyTrainer MVP

## Database Schema

add picture of our database - coming soon

## Used Technologies

Back-end: MySQL, Node.js/Express

Front-end: JavaScript/React, CSS3, HTML5

## Prerequisites for back-end to install

//coming soon

## Prerequisites for front-end to install

//coming soon

## Dependencies

- Run `npm install` in the project folder to install dependencies related to Express (the server).
- `cd client` and run `npm install` to install dependencies related to React (the client).

## Database Setup

- Create the database mytrainer in MySQL:
  `CREATE DATABASE mytrainer;`
- Use the provided _init_db.sql_ file to import the initial database tables `npm run migrate` in back end terminal
- Ensure the tables have been correctly created by running the following in MySQL:
  ```USE mytrainer;
  SHOW TABLES;
  DESCRIBE users;
  DESCRIBE exerceses;
  DESCRIBE favorite_exerceses;
  DESCRIBE favorite_food;
  ```
- Create the .env file to match your personal credentials such as DB_HOST, DB_USER, DB_PASS, DB_NAME, SUPER_SECRET
