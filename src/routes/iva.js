const express = require('express');
const router = express.Router();
const controllers = require("../controllers/iva")

router
    .post('/findGrupoIva', controllers.findGrupoIva)
 
    module.exports = router