// Here is where we import modules
// We begin by loading Express
import express from "express";
import dotenv from "dotenv"; // require package
import mongoose from "mongoose";
import methodOverride from "method-override";
import logger from "morgan";

// controllers imports
import * as fruitsCtrl from "./controllers/fruits.js";

dotenv.config(); // Loads the environment variables from .env file
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(logger("dev"));

mongoose.connect(process.env.MONGODB_URI);

// GET
app.get("/", fruitsCtrl.renderHome);
app.get("/fruits/new", fruitsCtrl.renderNewForm);
app.get("/fruits", fruitsCtrl.index);
app.get("/fruits/:id", fruitsCtrl.show);
app.get("/fruits/:fruitId/edit", fruitsCtrl.edit);
//POST
app.post("/fruits", fruitsCtrl.create);
//UPDATE
app.put("/fruits/:id", fruitsCtrl.update);
//DELETE
app.delete("/fruits/:id", fruitsCtrl.destroy);

mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
  app.listen(3000, () => {
    console.log("Listening on port 3000");
  });
});
