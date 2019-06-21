const express = require("express");
const app = express();
const morgan = require("morgan");
const path = require("path");
const errorTemplate = require("./views/error");

app.use(morgan("dev")); //logging middleware
app.use(express.static(path.join(__dirname, "./public"))); //serving up static files (e.g. css files)
//body parser return an object so we need .json to use it.
app.use(express.urlencoded({ extended: false }));
//?????
app.use(express.json());

app.use("/wiki", require("./routes/wiki"));
app.use("/users", require("./routes/users"));

// app.get('/', function (req, res, next) {
//       res.redirect('/wiki/');
//       next();
// });

app.get('/', function (req, res, next) {
   try {
      res.redirect('/wiki/');
   } catch(error) {next(error)}

});

app.use((req, res, next) => {
   // ghggjggjhghgj;
   res.status(404).send(errorTemplate("Hello Cats, you at the wrong page.", 404));
})

app.use((err, req, res, next) => {
   // err.stack is the error stack that receive.
   console.error(err.stack)
   res.status(500).send(errorTemplate("Internal Server Error", 500));
})

module.exports = app;
