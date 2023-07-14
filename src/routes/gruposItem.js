const express = require('express');
const router = express.Router();
const controllers = require("../controllers/gruposItem")

router
    .post('/capturagrupos', controllers.capturagrupos)
    .post('/grabagrupos', controllers.grabagrupos)
    .post('/getgrupos', controllers.getgrupos)
    .post('/getcatalogogrupos', controllers.getcatalogogrupos)
    .post('/grabacatalogogrupos', controllers.grabacatalogogrupos)
    .post('/updatecatalogogrupos', controllers.updatecatalogogrupos)

module.exports = router

