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

###Dependecies for back-end installation `Node/Express`:
`npm install mysql nodemon dotenv cors` - will install MySQL, Nodemon, Dotenv and CORS;

###Dependecies for front-end installation `client`:
`npm install react-router-dom` - install react router;

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

##Our color Pallete for now:
Call to action btn:
#EF476F -salmon
Some lines, acsent of website:
#FFD166 - yellow
#073B4C - bright green
#118AB2 - blue
h1 ... h6
#06D6A0 - dark blue for headers
paragraph p:
#342F2F
