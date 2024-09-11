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
`npm install mysql nodemon dotenv cors jsonwebtoken bcrypt` - will install MySQL, Nodemon, Dotenv CORS and Jsonwebtoken Bcrypt;

###Dependecies for front-end installation `client`:
`npm install react-router-dom axios` - install react router and axios;
`npm install react-youtube` - install Youtube component;

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

#EF476F -salmon - call to action btn:
Some lines, acsent of website:
#FFD166 - yellow
#06D6A0 - bright green
#118AB2 - blue
Text:
#073B4C - dark blue for headers h1 ... h6
#342F2F -paragraph p and all other text
