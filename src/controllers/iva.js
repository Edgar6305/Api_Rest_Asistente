const sql = require('mssql');
const {config} = require("../routes/config.js")
const {httpError} = require("../helpers/handelError.js")

const findGrupoIva=async (req, res) => {
    //console.log(req.body)
    try {
        await sql.connect(config)
        var result = await sql.query`Select * From GrupoIva WHERE IDEmpresa= ${req.body.idEmpresa} AND IDGrupoiva= ${req.body.IdGrupoIva}`
        console.log(result.recordset[0])
        if (result.rowsAffected[0] == 0){
            res.status(500).json({"status": 'FALLO', "Mensaje" : "Grupo IVA NO registrada, Verifique"})
        }else{
            res.status(200).json({"status": 'OK', "Data" : result.recordset[0]})
        }

    } catch (error) {
        error.origen='controllers/findGrupoIva'
        httpError(res, error)
    }
}



module.exports = { findGrupoIva}