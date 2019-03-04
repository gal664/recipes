const db = require('../db')
const { Schema } = require('mongoose')

const recipeSchema = new db.Schema({
    ingredients: [{ name: String, amount: Number, measurement: String }],
    method: [{ description: String, duration: { amount: Number, unit: String } }],
    title: String,
    author: String,
    source: { name: String, url: String },
    image: Schema.Types.Mixed,
    category: {
        type: Schema.Types.ObjectId,
        ref: "category"
  }
})

const Recipe = db.model('recipe', recipeSchema)

module.exports = Recipe