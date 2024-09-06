var express = require("express");
var router = express.Router();
const db = require("../model/helper");
const userShouldBeLoggedIn = require("../guards/userShouldBeLoggedIn");

// favorite_food table

// Show all favorite_food: http://localhost:4000/api/favfoods/

// Get all favorite foods
router.get('/food/:id', userShouldBeLoggedIn, async (req, res) => {
    try {
        const result = await db.query(`SELECT * FROM favorite_food WHERE users_id = ${req.user_id}`);
        if (result.data.length === 1) {
            // food is found!
            res.send(result.data[0]); // 
        } else {
            // food not found!
            res.status(404).send({ error: "books not found" });
        }
    } catch (err) {
        res.status(500).json({ error: 'Database query failed' });
    }
});

// Add a new favorite food
router.post('/food', userShouldBeLoggedIn, async (req, res) => {
    const { externalApiId, name, image } = req.body;
    try {
        await db.query(`INSERT INTO favorite_food (users_id, external_api_id, name, image) VALUES ${req.user_id}, ${externalApiId}, "${name}", "${image}"`);
        res.status(201).json({ message: 'Favorite food added' });
    } catch (err) {
        res.status(500).json({ error: 'Database query failed' });
    }
});

// Delete a favorite food by ID
router.delete("/food/:id", userShouldBeLoggedIn, async (req, res) => {
    try {
    await db(`SELECT * FROM favorite_food WHERE id = ${req.params.id} AND users_id = ${req.user_id}`);
    await db(`DELETE FROM favorite_food WHERE id = ${req.params.id} AND users_id = ${req.user_id}`);

    const result = await db(`SELECT * FROM ${req.user_id}`)
    res.send(result.data)

    } catch (err) {
    res.status(500).send({ error: err.message })
    }
})


module.exports = router;
