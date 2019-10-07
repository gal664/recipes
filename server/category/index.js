const Category = require("./categoryModel")
const express = require("express")
const router = express.Router()

// create category
router.post("/", (req, res) => {
    const category = new Category(req.body)
    category.save()
        .catch(e => res.status(400).send(e.message))
        .then((data) => {
            const response = { success: true, id: data._id }
            res.send(response)
        })
})

// bulk create categories
router.post("/bulk", (req, res) => {
    Category.insertMany(req.body)
        .catch(e => res.status(400).send(e.message))
        .then((data) => {
            const response = { success: true, ids: data.map(item => item.id) }
            res.send(response)
        })
})

// get all categorys. if used with query in url gets only categorys with titles matching the query
router.get("/", (req, res) => {
    let query = req.query
    if (query) {
        Object.keys(query).forEach( item => {
            if(item !== "_id"){
                query[item] = new RegExp(query[item], "i")
            }
        })
    }
    Category.find(query)
        .then(data => res.send(data))
        .catch(e => res.status(400).send(e.message))
})

// get a category by id
router.get("/:categoryId", (req, res) => {
    Category.findById(req.params.categoryId)
        .then(data => res.send(data))
        .catch(e => res.status(400).send(e.message))
})

// delete category by id
router.delete("/:categoryId", (req, res) => {
    Category.findByIdAndRemove(req.params.categoryId)
        .catch(e => res.status(400).send(e.message))
        .then(() => {
            const response = { success: true, id: req.params.categoryId }
            res.send(response)
        })
})

module.exports = router