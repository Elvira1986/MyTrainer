var express = require("express");
var router = express.Router();
const db = require("../model/helper");

// favorite_exercises table

// Show all favorite_exercises: http://localhost:4000/api/favexercises/

// Get all favorite exercises
router.get('/', async (req, res) => {
    try {
        const favExercises = await db.query('SELECT * FROM favorite_exercises WHERE users_id = ?', [req.user.id]);
        res.status(200).json(favExercises);
    } catch (err) {
        res.status(500).json({ error: 'Database query failed' });
    }
});

// Add a new favorite exercise
router.post('/', async (req, res) => {
    const { exerciseId } = req.body;
    try {
        await db.query('INSERT INTO favorite_exercises (users_id, exercises_id) VALUES (?, ?)', [req.user.id, exerciseId]);
        res.status(201).json({ message: 'Favorite exercise added' });
    } catch (err) {
        res.status(500).json({ error: 'Database query failed' });
    }
});

// Delete a favorite exercise by ID
router.delete('/:id', async (req, res) => {
    try {
        await db.query('DELETE FROM favorite_exercises WHERE id = ? AND users_id = ?', [req.params.id, req.user.id]);
        res.status(200).json({ message: 'Favorite exercise deleted' });
    } catch (err) {
        res.status(500).json({ error: 'Database query failed' });
    }
});

module.exports = router;
