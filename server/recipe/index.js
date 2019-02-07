const Recipe = require("./recipeModel")
const express = require("express")
const router = express.Router()

// create recipe
router.post("/", (req, res) => {
    const recipe = new Recipe(req.body)
    recipe.save()
        .catch(e => res.status(400).send(e.message))
        .then((data) => {
            const response = { success: true, id: data._id }
            res.send(response)
        })
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

// get a recipe by id
router.get("/:recipeId", (req, res) => {
    Recipe.findById(req.params.recipeId)
        .then(data => res.send(data))
        .catch(e => res.status(400).send(e.message))
})

// delete recipe by id
router.delete("/:recipeId", (req, res) => {
    
    let id = req.params.recipeId
    
    Recipe.findByIdAndRemove(id)
        .catch(e => res.status(400).send(e.message))
        .then(() => {
            const response = { success: true, id: id }
            res.send(response)
        })
})

module.exports = router