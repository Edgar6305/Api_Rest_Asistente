const express = require('express');
const router = express.Router();
const controllers = require("../controllers/utilidades.js")

router.post('/barrarec',  controllers.barrarec)

module.exports = router;