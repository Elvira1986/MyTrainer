var express = require("express");
var router = express.Router();
const db = require("../model/helper");
const userShouldBeLoggedIn = require("../guards/userShouldBeLoggedIn");

// favorite_food table

// Show all favorite_food: http://localhost:4000/api/favfoods/

// Get all favorite foods
router.get('/food',userShouldBeLoggedIn, async (req, res) => {
    const SELECT = `SELECT id, name, image, external_api_id FROM favorite_food WHERE users_id = ${req.user_id};`;
    
    try {
        const result = await db(SELECT);
        res.send(result.data)
    } catch (err) {
        res.status(500).send({ error: 'Database query failed' });
    }
});

// Add a new favorite food
router.post('/food',userShouldBeLoggedIn, async (req, res) => {
    const { external_api_id, name, image } = req.body;
    console.log(req.user_id)
    try {
        await db(`INSERT INTO favorite_food (users_id, external_api_id, name, image) VALUES (${req.user_id}, '${external_api_id}', '${name}', '${image}');`);
        console.log(external_api_id, name, image)
        const result = await db(`SELECT * FROM favorite_food WHERE users_id = ${req.user_id};`)
        res.status(200).send({ message: 'Favorite food added', data: result.data});
    } catch (err) {
        res.status(500).send({ error: 'Database query failed' });
    }
});



// Delete a favorite food by ID
router.delete("/food", userShouldBeLoggedIn, async (req, res) => {
    const { external_api_id } = req.body;
    try {
    await db(`SELECT * FROM favorite_food WHERE external_api_id = "${external_api_id}" AND users_id = ${req.user_id};`);
    await db(`DELETE FROM favorite_food WHERE external_api_id = "${external_api_id}" AND users_id = ${req.user_id};`);

    const result = await db(`SELECT * FROM favorite_food WHERE users_id = ${req.user_id};`)
    res.send(result.data)

    } catch (err) {
    res.status(500).send({ error: err.message })
    }
})


module.exports = router;
