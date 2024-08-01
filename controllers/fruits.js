// controllers/fruits.js

import Fruit from "../models/fruit.js";

const index = async (req, res) => {
    const allFruits = await Fruit.find();
    res.render("fruits/index.ejs", { fruits: allFruits });
};

const show = async (req, res) => {
    const foundFruit = await Fruit.findById(req.params.id);
    res.render("fruits/show.ejs", { fruit: foundFruit });
};

const create = async (req, res) => {
    if (req.body.isReadyToEat === "on") {
        req.body.isReadyToEat = true;
    } else {
        req.body.isReadyToEat = false;
    }
    await Fruit.create(req.body);
    res.redirect("/fruits");
};

const edit = async (req, res) => {
    const foundFruit = await Fruit.findById(req.params.fruitId);
    res.render(`fruits/edit.ejs`, { fruit: foundFruit });
};

const update = async (req, res) => {
    if (req.body.isReadyToEat === "on") {
        req.body.isReadyToEat = true;
    } else {
        req.body.isReadyToEat = false;
    }
    console.log(await Fruit.findByIdAndUpdate(req.params.id, req.body));
    res.redirect(`/fruits/${req.params.id}`);
};

const destroy = async (req, res) => {
    console.log(await Fruit.findByIdAndDelete(req.params.id));
    res.redirect("/fruits");
};

// Add the new methods for rendering static pages
const renderHome = (req, res) => {
    res.render("index.ejs");
};

const renderNewForm = (req, res) => {
    res.render("fruits/new.ejs");
};

export { 
    index,
    show,
    create,
    edit,
    update,
    destroy,
    renderHome,
    renderNewForm
};
