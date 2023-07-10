const express = require('express');
const router = express.Router();
const controllers = require("../controllers/bodegas.js")

router.post('/bodega', controllers.bodega)
    .post('/getbodegas', controllers.getbodegas)
    .post('/updatebodegas', controllers.updatebodegas)
    .post('/borrabodegas', controllers.borrabodegas)
    .post('/creabodegas', controllers.creabodegas)
    .post('/browsebodega', controllers.browsebodega)

module.exports = router;