const Recipe = require("./recipeModel");
const express = require("express");
const router = express.Router();

// create recipe
router.post("/", (req, res) => {
    const recipe = new Recipe(req.body);
    recipe.save()
        .then(data => res.send(`Saved!<br> recipe name: ${data.title}.<br> recipe id: ${data._id}`))
        .catch(e => res.status(400).send(e.message));
});

module.exports = router;