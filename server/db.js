const mongoose = require('mongoose')
const DB_URL = process.env.MLAB_URL || 'mongodb://localhost:27017/recipes'

mongoose.connect(DB_URL, { useNewUrlParser: true })

module.exports = mongoose