var express = require("express");
var router = express.Router();
const db = require("../model/helper");

// EXERCISES table

// Show ALL exercises: http://localhost:4000/api/exercises/

// Get all exercises
router.get("/", async (req, res) => {
  try {
    // Getting all the data from users table
    let result = await db("SELECT * FROM exercises");
    let exercises = result.data;
    res.send(exercises);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// Show/GET one exercise based on id:
router.get("/:id", async function (req, res, next) {
  let exerciseId = req.params.id;
  try {
    let result = await db(`SELECT * FROM exercises WHERE id = ${exerciseId}`);
    // Was the exercise found?
    if (result.data.length === 1) {
      // Yes, exercise exist
      res.send(result.data[0]); // return exercise obj from array of results
    } else {
      // No exercise wasn't found with specific id ID
      res.status(404).send({ error: "Exercise not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// Show/GET one exercise based on id:
router.put("/:id", async function (req, res, next) {
  let exerciseId = req.params.id;
  try {
    let result = await db(`SELECT * FROM exercises WHERE id = ${exerciseId}`);
    // Was the exercise found?
    if (result.data.length === 1) {
      // Yes, exercise exist
      res.send(result.data[0]); // return exercise obj from array of results
    } else {
      // No exercise wasn't found with specific id ID
      res.status(404).send({ error: "Exercise not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;
