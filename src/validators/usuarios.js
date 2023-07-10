const { check} = require("express-validator")
const validateResults = require("../utilidades/handlevalidadtor")

const validatorCreausuarios = [
    check("idempresa").exists().notEmpty(),
    check("usuariocrea").exists().notEmpty(),
    check("usuario").exists().notEmpty(),
    check("descripcion").exists().notEmpty(),
    check("email").exists().notEmpty(),
    check("clave").exists().notEmpty(),
    check("idperfil").exists().notEmpty(),

    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

const validatorLoginusuarios = [
    check("usuario").exists().notEmpty(),
    check("clave").exists().notEmpty(),

    (req, res, next) => {
        return validateResults(req, res, next)
    }
]



module.exports = { validatorCreausuarios, validatorLoginusuarios }