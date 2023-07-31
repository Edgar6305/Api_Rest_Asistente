const express = require('express');
const router = express.Router();
const catalogo = require("../controllers/catalogo.js")

router
    .post('/creaitem', catalogo.creaitem)
    .post('/getitem', catalogo.getitem)
    .post('/finditem', catalogo.finditem)
    .post('/findItemExistencia', catalogo.findItemExistencia)
    .post('/findBodegaItemExistencia', catalogo.findBodegaItemExistencia)
    .post('/CreaItemExistencia', catalogo.CreaItemExistencia)
    .post('/UpdateItemExistencia', catalogo.UpdateItemExistencia)    

module.exports = router