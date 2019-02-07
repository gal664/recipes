const express = require("express")
const server = express()
const bodyParser = require("body-parser")
const path = require("path")
const port = 9000
const recipe = require("./recipe")

server.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

server.get('/', (req, res) => res.send('Server is alive!'))

server.use(bodyParser.json())

server.use("/api/recipe", recipe)

server.listen(process.env.PORT || port, () => console.log(`Server is listening on port ${port}!`))