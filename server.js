// Here is where we import modules
// We begin by loading Express
import express from "express"
import dotenv from "dotenv" // require package
import mongoose from "mongoose" 
import Fruit from "./models/fruit.js"

dotenv.config(); // Loads the environment variables from .env file
const app = express();
app.use(express.urlencoded({ extended: false }));


mongoose.connect(process.env.MONGODB_URI);


// GET /
app.get("/", async (req, res) => {
    res.render("index.ejs");
});

app.get("/fruits/new", async (req, res) => {
    res.render("fruits/new.ejs");
})

app.get("/fruits", async (req, res) => {
    const allFruits = await Fruit.find();
    console.log(allFruits)

    res.render("fruits/index.ejs", {fruits: allFruits});
  });
  
app.post('/fruits', async (req, res) => {
    console.log(req.body)
    if (req.body.isReadyToEat === "on") {
        req.body.isReadyToEat = true
    } else {
        req.body.isReadyToEat = false
    }

    await Fruit.create(req.body)
    res.redirect("/fruits")
})

mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`)
    app.listen(3000, () => {
        console.log("Listening on port 3000");
        });
})
