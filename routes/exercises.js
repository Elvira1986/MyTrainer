var express = require("express");
var router = express.Router();
const db = require("../model/helper");

// EXERCISES table

// Show ALL exercises: http://localhost:4000/api/exercises/

// Get all exercises
router.get('/', async (req, res) => {
    try {
        const exercises = await db.query('SELECT * FROM exercises');
        res.status(200).json(exercises);
    } catch (err) {
        res.status(500).json({ error: 'Database query failed' });
    }
});

module.exports = router;
