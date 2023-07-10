const sql = require('mssql');
const {config} = require("../routes/config.js")

const barrarec=async (req, res) => {
    try {
        var result
        await sql.connect(config)
        switch (req.body.accion) {
            case 1:
                var mysql="Select TOP 1 * From " + req.body.tabla + " Order By " + req.body.campo
                result = await sql.query(mysql) 
            break
            case 2:
                var mysql="Select TOP 1 * From " + req.body.tabla + " Order By " + req.body.campo +" DESC"
                result = await sql.query(mysql)
            break
            case 3:
                var mysql="Select TOP 1 * From " + req.body.tabla + " Where " + req.body.campo + " > " + req.body.referencia
                result = await sql.query(mysql)
            break
            case 4:
                var mysql="Select TOP 1 * From " + req.body.tabla + " Where " + req.body.campo + " < " + req.body.referencia
                result = await sql.query(mysql)
            break
        }    
        if (result.rowsAffected[0] == 0){
            res.status(500).json({"status": 'FALLO', "Mensaje" : "NO hay datos en " + req.body.tabla + " , Verifique"})
        }else{
            res.status(200).json({"status": 'OK', "ID" : result.recordset[0]})
        }

    } catch (error) {
        res.status(500).json({"status": 'ERROR', "Mensaje" : error.message})
    }
}



module.exports = { barrarec}