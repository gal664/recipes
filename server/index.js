const express = require("express")
const server = express()
const bodyParser = require("body-parser")
const path = require("path")
const port = 3000
const recipe = require("./recipe")

server.get('/', (req, res) => res.send('Hello World!'))

server.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
})

server.use(bodyParser.json())

server.use(express.static(path.join(__dirname, "../build")))

server.use("/api/recipe", recipe)

server.listen(process.env.PORT || port)