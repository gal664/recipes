const db = require('../db')
const { Schema } = require('mongoose')

const recipeSchema = new db.Schema({
    ingredients: [
        {
            name: String,
            amount: Number,
            measurment: String,
        }
    ],
    method: [
        {
            description: String,
            length: {
                hours: { Number, default: 00 },
                minutes: { Number, default: 00 },
                seconds: { Number, default: 00 },
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