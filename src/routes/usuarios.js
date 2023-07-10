const express = require('express');
const router = express.Router();
const ensureToken = require("../middleware/ensureToken.js")
const validators = require("../validators/usuarios.js")
const controllers = require("../controllers/usuarios.js")

router
    .post('/Registro', controllers.creaRegistro)
    .post('/login', validators.validatorLoginusuarios, ensureToken, controllers.validausuario)
    .post('/creausuario', validators.validatorCreausuarios, ensureToken, controllers.creausuario)
    .post('/getempresa', ensureToken, controllers.getempresa)

module.exports = router