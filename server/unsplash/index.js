const express = require("express")
const router = express.Router()
require('es6-promise').polyfill()
require('isomorphic-fetch')
const Unsplash = require('unsplash-js').default
const toJson = require('unsplash-js').toJson
const unsplashConfig = require('../unsplashKeys/config.json')

const unsplash = new Unsplash({
    applicationId: unsplashConfig.APP_ACCESS_KEY,
    secret: unsplashConfig.APP_SECRET
})

// search in unsplash API
router.get("/:keyword/:page/:perpage", (req, res) => {
    unsplash.search.photos(req.params.keyword, req.params.page, req.params.perpage)
        .then(toJson)
        .then(json => res.send(json))
        .catch(e => res.status(400).send(e.message))
})

module.exports = router