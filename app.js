var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");

// import the database
var usersRouter = require("./routes/users");
var authRouter = require("./routes/auth");
var exercisesRouter = require("./routes/exercises");
var favExercisesRouter = require("./routes/favexercises");
var favFoodsRouter = require("./routes/favfoods");

var app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "public")));

//app.use("/api/users", usersRouter);
app.use("/api/auth", authRouter);
app.use("/api/exercises", exercisesRouter);
app.use("/api/favexercises", favExercisesRouter);
app.use("/api/favfoods", favFoodsRouter);

// Get to home page
app.get("/", function (req, res) {
  res.send({ message: "Welcome to the homepage" });
});

module.exports = app;
