var express = require("express");
var router = express.Router();
const db = require("../model/helper");

// EXERCISES table

// Show ALL exercises: http://localhost:4000/api/exercises/

// Get all exercises
router.get("/", async (req, res) => {
    try {
        // Getting all the data from users table
        let result = await db('SELECT * FROM exercises');
        let exercises = result.data;
        res.send(exercises);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

module.exports = router;
