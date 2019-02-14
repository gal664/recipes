const db = require('../db')
const { Schema } = require('mongoose')

const categorySchema = new db.Schema({
    title: String
})

const Category = db.model('category', categorySchema)

module.exports = Category