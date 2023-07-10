const express = require('express');
const router = express.Router();
const catalogo = require("../controllers/catalogo.js")

router.post('/creaitem',  catalogo.creaitem)


module.exports = router;