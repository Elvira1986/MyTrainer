// var express = require("express");
// var router = express.Router();
// const db = require("../model/helper");
// const userShouldBeLoggedIn = require("../guards/userShouldBeLoggedIn");

// // USERS table to access in nodemon http://localhost:4000/api/users/

// //Show/GET all register users:
// router.get("/", async (req, res) => {
//   try {
//     // Getting all the data from users table
//     let result = await db("SELECT * FROM users");
//     let users = result.data;
//     res.send(users);
//   } catch (err) {
//     res.status(500).send({ error: err.message });
//   }
// });

// // Show/GET one user based on id:
// router.get("/:id", userShouldBeLoggedIn, async function (req, res, next) {
//   let userId = req.params.id;

//   try {
//     let result = await db(`SELECT * FROM users WHERE id = ${userId}`);
//     // Was the user found?
//     if (result.data.length === 1) {
//       // Yes, the user is found
//       res.send(result.data[0]); // return first user obj from array of results
//     } else {
//       // No user was found with ID
//       res.status(404).send({ error: "User not found" });
//     }
//   } catch (err) {
//     res.status(500).send({ error: err.message });
//   }
// });

// // // INSERT a new user into the users table
// router.post("/", async function (req, res, next) {
//   // extract names from request body
//   let {
//     username,
//     password,
//     first_name,
//     last_name,
//     height,
//     weight,
//     gender,
//     goal,
//   } = req.body;
//   console.log(req.body);
//   try {
//     let sql = `
//       INSERT INTO users (username, password, first_name, last_name, height, weight, gender, goal)
//       VALUES ("${username}", "${password}", "${first_name}", "${last_name}", ${height}, ${weight}, "${gender}", "${goal}")
//     `;
//     // Do the INSERT and ignore the result
//     await db(sql);
//     // Return updated array of users
//     let result = await db("SELECT * FROM users");
//     res.status(201).send(result.data);
//   } catch (err) {
//     res.status(500).send({ error: err.message });
//   }
// });

// // DELETE the user from users table DB based on ID
// router.delete("/:id", userShouldBeLoggedIn, async function (req, res, next) {
//   let userId = req.params.id;

//   try {
//     let result = await db(`SELECT * FROM users WHERE id = ${userId}`);
//     // Was the user found?
//     if (result.data.length === 1) {
//       // Yes & Do DELETE and ignore the result
//       await db(`DELETE FROM users WHERE id = ${userId}`);
//       // Return updated array of habits
//       result = await db("SELECT * FROM users");
//       res.send(result.data);
//     } else {
//       // No, user didn't exist with ID
//       res.status(404).send({ error: "User not found" });
//     }
//   } catch (err) {
//     res.status(500).send({ error: err.message });
//   }
// });

// // Update/PATCH Goal & Weight in user profile by id
// router.patch("/:id", userShouldBeLoggedIn, async function (req, res) {
//   // get user by id and assign it
//   let userId = req.params.id;
//   let {
//     username,
//     password,
//     first_name,
//     last_name,
//     height,
//     weight,
//     gender,
//     goal,
//   } = req.body;

//   try {
//     // SELECT everything from users table with specific ID;
//     let result = await db(`SELECT * FROM users WHERE id = ${userId}`);
//     if (result.data.length === 1) {
//       await db(
//         `UPDATE users SET weight = ${weight}, goal="${goal}" WHERE id = ${userId};`
//       );
//       // Return updated array of user
//       result = await db("SELECT * FROM users");
//       res.send(result.data);
//     } else {
//       // user not found!
//       res.status(404).send({ error: "Item not found" });
//     }
//   } catch (err) {
//     res.status(500).send({ error: err.message });
//   }
// });

// // Update/PUT all user profile by id
// router.put("/:id", userShouldBeLoggedIn, async function (req, res) {
//   // get user by id and assign it to userId
//   let userId = req.params.id;
//   let {
//     username,
//     password,
//     first_name,
//     last_name,
//     height,
//     weight,
//     gender,
//     goal,
//   } = req.body;

//   try {
//     // SELECT everything from users table with specific ID;
//     let result = await db(`SELECT * FROM users WHERE id = ${userId}`);
//     if (result.data.length === 1) {
//       await db(
//         `UPDATE users SET username="${username}", password="${password}", first_name="${first_name}", last_name="${last_name}", height=${height}, weight =${weight}, gender ="${gender}", goal="${goal}" WHERE id = ${userId};`
//       );
//       // Return updated array of users
//       result = await db("SELECT * FROM users");
//       res.send(result.data);
//     } else {
//       // user not found!
//       res.status(404).send({ error: "Item not found" });
//     }
//   } catch (err) {
//     res.status(500).send({ error: err.message });
//   }
// });

// module.exports = router;
