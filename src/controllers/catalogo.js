const sql = require('mssql');
const {config} = require("../routes/config.js")

const creaitem=async (req, res) => {
    try {
        await sql.connect(config)
        var mysql ="EXEC PA_CreaItem " + req.body.idempresa + ",'" + req.body.descripcion + "'," + req.body.fabricante + ","
            mysql+= req.body.sku + "," + req.body.generico + "," + req.body.unidad + "," + req.body.grupo + "," + req.body.usuario 
            console.log(mysql)
        var result = await sql.query(mysql)
        if (result.rowsAffected[0] == 0){
            res.status(500).json({"status": result.recordset[0].OK, "Mensaje": result.recordset[0].Mensaje})
        }else{
            res.status(200).json({"status": result.recordset[0].OK, "Mensaje": result.recordset[0].Mensaje, "Registro" : result.recordset[0].ID})
        }
    } catch (error) {
        error.origen='controllers/creaitem'
        httpError(res, error)
    }
}


module.exports = {creaitem}
