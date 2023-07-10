const express = require('express');
const router = express.Router();
const {barrarec} = require("../controllers/utilidades.js")

router.post('/barrarec',  barrarec)

module.exports = router;