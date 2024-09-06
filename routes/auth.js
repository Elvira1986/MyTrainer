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

        res.send({ message: "Register successful"});
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



console.log(userShouldBeLoggedIn, "meeee");

// Display/GET info based on login user
router.get("/profile", userShouldBeLoggedIn, async (req, res) => {
  const results = await db(
    `SELECT username, first_name, last_name, height, weight, gender, goal FROM users WHERE id = ${req.user_id}`
  );
  res.send(results.data[0]);
});

// Delete user who log in
router.delete("/profile", userShouldBeLoggedIn, async (req, res) => {
  try {
    let result = await db(`SELECT * FROM users WHERE id = ${req.user_id}`);
    // Was the user found?
    if (result.data.length === 1) {
      // Yes & Do DELETE and ignore the result
      await db(`DELETE FROM users WHERE id = ${req.user_id}`);
      // Return updated array of habits
      result = await db("SELECT * FROM users");
      res.send(result.data);
    } else {
      // No, user didn't exist with ID
      res.status(404).send({ error: "User not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// Update/PATCH Goal & Weight in user profile by id
router.patch("/profile", userShouldBeLoggedIn, async function (req, res) {
  // get user by id and assign it
  let {
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
    // SELECT everything from users table with specific ID;
    let result = await db(`SELECT * FROM users WHERE id = ${req.user_id}`);
    if (result.data.length === 1) {
      await db(
        `UPDATE users SET weight = ${weight}, goal="${goal}" WHERE id = ${req.user_id};`
      );
      // Return updated array of user
      result = await db("SELECT * FROM users");
      res.send(result.data);
    } else {
      // user not found!
      res.status(404).send({ error: "Item not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;
