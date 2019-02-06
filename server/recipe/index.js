const Recipe = require("./recipeModel")
const express = require("express")
const router = express.Router()

// create recipe
router.post("/", (req, res) => {
    const recipe = new Recipe(req.body)
    recipe.save()
        .then(data => res.send(`Saved!<br> recipe name: ${data.title}.<br> recipe id: ${data._id}`))
        .catch(e => res.status(400).send(e.message))
})

// get all recipes. if used with query in url gets only recipes with titles matching the query
router.get("/", (req, res) => {
    let filter = {}
    let query = req.query.q

    if (query) {
        console.log(query)
        const rgx = new RegExp(query, "i")
        console.log(rgx)
        filter = { title: rgx }
    }

    Recipe.find(filter)
        .then(data => res.send(data))
        .catch(e => res.status(400).send(e.message))
})

module.exports = router