const express = require('express');
const router = express.Router();
const catalogo = require("../controllers/catalogo.js")

router
    .post('/creaitem', catalogo.creaitem)
    .post('/getitem', catalogo.getitem)
    .post('/finditem', catalogo.finditem)
    .post('/findItemExistencia', catalogo.findItemExistencia)
    module.exports = router