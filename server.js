// Here is where we import modules
// We begin by loading Express
import express from "express"
const dotenv = require("dotenv"); // require package
dotenv.config(); // Loads the environment variables from .env file
const mongoose = require("mongoose"); 

const app = express();

mongoose.connect(process.env.MONGODB_URI);


// GET /
app.get("/", async (req, res) => {
    res.render("index.ejs");
  });
  

app.listen(3000, () => {
console.log("Listening on port 3000");
});