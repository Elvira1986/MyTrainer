const express = require("express");
const router = express.Router();
const db = require("../model/helper");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const userShouldBeLoggedIn = require("../guards/userShouldBeLoggedIn");
const saltRounds = 10;

// AUTH

//Show all register: http://localhost:4000/api/?

const supersecret = process.env.SUPER_SECRET;

router.post("/register", async (req, res) => {
  const {
    username,
    password,
    first_name,
    last_name,
    height,
    weight,
    gender,
    goal,
  } = req.body;

    try {
        const hash = await bcrypt.hash(password, saltRounds);

        await db(
            `INSERT INTO users (username, password, first_name, last_name, height, weight, gender, goal)
            VALUES ("${username}", "${hash}", "${first_name}", "${last_name}", ${height}, ${weight}, "${gender}", "${goal}")`
        );

        const results = await db(`SELECT username, first_name, last_name, height, weight, gender, goal FROM users WHERE username = "${username}"`);

        res.send({ message: "Register successful", user: results.data[0] });
    } catch (err) {
    res.send({ message: err.message });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const results = await db(
      `SELECT * FROM users WHERE username = "${username}"`
    );
    const user = results.data[0];
    if (user) {
      const user_id = user.id;

      const correctPassword = await bcrypt.compare(password, user.password);

      if (!correctPassword) {
        res.status(400).send({ message: "Incorrect password" });
      }

        const token = jwt.sign({ user_id }, supersecret);
        res.status(200).send({ message: "Login successful, here is your token", token, user: results.data[0] });
    } else {
      res.status(400).send({ message: "User does not exist" });
    }
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});



router.get("/profile", userShouldBeLoggedIn, async (req, res) => {
  const results = await db(
    `SELECT username, first_name, last_name, height, weight, gender, goal FROM users WHERE id = ${req.user_id}`
  );
  res.send(results.data[0]);
});

module.exports = router;
