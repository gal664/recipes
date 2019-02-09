const db = require('../db')
const { Schema } = require('mongoose')

const recipeSchema = new db.Schema({
    ingredients: [
        {
            name: String,
            amount: Number,
            measurement: String,
        }
    ],
    method: [
        {
            description: String,
            duration: {
                amount: Number,
                unit: String,
              },
        }
    ],
    title: { type: String, default: "" },
    author: { type: String, default: "" },
    source: {
        name: { type: String, default: "" },
        url: { type: String, default: "" }
    }
})

const Recipe = db.model('recipe', recipeSchema)

module.exports = Recipe