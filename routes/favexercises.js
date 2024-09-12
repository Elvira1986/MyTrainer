var express = require("express");
var router = express.Router();
const db = require("../model/helper");
const userShouldBeLoggedIn = require("../guards/userShouldBeLoggedIn");

// favorite_exercises table
// Show all favorite_exercises: http://localhost:4000/api/favexercises/

// Add Favorite Exercise to login user
router.post("/favourites", userShouldBeLoggedIn, async (req, res) => {
  // const exerciseId = req.exercises.id;
  let { exercises_id } = req.body;
  console.log(exercises_id);
  try {
    let sql = `INSERT INTO favorite_exercises (users_id, exercises_id) VALUES (${req.user_id}, ${exercises_id});`;
    await db(sql);
    let result = await db(
      `SELECT * FROM favorite_exercises WHERE users_id=${req.user_id};`
    );
    res.status(201).send(result.data);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// Display/GET fav_exercises of login user, will only display user id and exercise id
router.get("/favourites", userShouldBeLoggedIn, async (req, res) => {
  const userId = req.user_id;
  const results = await db(
    `SELECT favorite_exercises.*, users.id, exercises.id, exercises.name, exercises.image, exercises.description, exercises.goal, exercises.muscles, exercises.category FROM favorite_exercises LEFT JOIN users ON users.id=favorite_exercises.users_id LEFT JOIN exercises ON exercises.id = favorite_exercises.exercises_id WHERE users_id=${userId}`
  );

  res.send(results.data);
});

// Remove/Delete fav exercises of login peron
router.delete("/favourites", userShouldBeLoggedIn, async (req, res) => {
  let { exercises_id } = req.body;
  try {
    const exists = await db(
      `SELECT * FROM favorite_exercises WHERE exercises_id = ${exercises_id} AND users_id = ${req.user_id};`
    );
    console.log(exercises_id, req.user_id, exists.data.lentgh);
    if (exists.data.length) {
      await db(
        `DELETE FROM favorite_exercises WHERE exercises_id = ${exercises_id} AND users_id = ${req.user_id};`
      );
    }
    const result = await db(
      `SELECT favorite_exercises.*, users.id, exercises.id, exercises.name, exercises.image, exercises.description, exercises.goal, exercises.muscles, exercises.category FROM favorite_exercises LEFT JOIN users ON users.id=favorite_exercises.users_id LEFT JOIN exercises ON exercises.id = favorite_exercises.exercises_id WHERE users_id=${req.user_id};`
    );

    res.send(result.data);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// SELECT favorite_exercises.*, users.id, exercises.id, exercises.name, exercises.image, exercises.goal, exercises.muscles, exercises.category FROM favorite_exercises LEFT JOIN users ON users.id=favorite_exercises.users_id LEFT JOIN exercises ON exercises.id = favorite_exercises.exercises_id;

module.exports = router;
