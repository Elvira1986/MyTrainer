var express = require("express");
var router = express.Router();
const db = require("../model/helper");

// favorite_food table

// Show all favorite_food: http://localhost:4000/api/favfoods/

// Get all favorite foods
router.get('/', async (req, res) => {
    try {
        const favFoods = await db.query('SELECT * FROM favorite_food WHERE users_id = ?', [req.user.id]);
        res.status(200).json(favFoods);
    } catch (err) {
        res.status(500).json({ error: 'Database query failed' });
    }
});

// Add a new favorite food
router.post('/', async (req, res) => {
    const { externalApiId, name, image } = req.body;
    try {
        await db.query('INSERT INTO favorite_food (users_id, external_api_id, name, image) VALUES (?, ?, ?, ?)', [req.user.id, externalApiId, name, image]);
        res.status(201).json({ message: 'Favorite food added' });
    } catch (err) {
        res.status(500).json({ error: 'Database query failed' });
    }
});

// Delete a favorite food by ID
router.delete('/:id', async (req, res) => {
    try {
        await db.query('DELETE FROM favorite_food WHERE id = ? AND users_id = ?', [req.params.id, req.user.id]);
        res.status(200).json({ message: 'Favorite food deleted' });
    } catch (err) {
        res.status(500).json({ error: 'Database query failed' });
    }
});

module.exports = router;
