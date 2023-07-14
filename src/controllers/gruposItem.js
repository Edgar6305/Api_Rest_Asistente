const sql = require('mssql');
const { config, options } = require("../routes/config.js")
const { httpError } = require("../helpers/handelError.js")
const bot = require('../utilidades/telegram.js')


const capturagrupos = async (req, res) => {
    try {
        //console.log(req.body)
        await sql.connect(config)
        var mysql = "SELECT DISTINCT Catalogo.Grupo "
        mysql += "FROM Catalogo LEFT OUTER JOIN CatalogoGrupos ON Catalogo.Grupo = CatalogoGrupos.Descripcion "
        mysql += "WHERE  Catalogo.IDEmpresa =" + req.body.idempresa + " AND  CatalogoGrupos.Tipo IS NULL"
        //console.log(mysql)
        var result = await sql.query(mysql)
        if (result.rowsAffected[0] == 0) {
            res.status(500).json({ "status": 'NO', "Mensaje": "NO hay Grupos que  registrar" })
            return
        } else {
            res.status(200).json({ "status": 'OK', "Catalogo": result.recordset })
        }

    } catch (error) {
        error.origen = 'controllers/capturagrupos'
        httpError(res, error)
    }
}

const grabagrupos = async (req, res) => {
    try {
        let i = 0
        let mysql
        const lenCatalogo = req.body.Catalogo.length
        console.log(req.body)
        await sql.connect(config)
        for (i = 0; i < lenCatalogo; i++) {
            mysql = "INSERT INTO CatalogoGrupos VALUES('" + req.body.Catalogo[i].Grupo + "','" + req.body.Catalogo[i].Grupo + "',0)"
            var result = await sql.query(mysql)
            if (result.rowsAffected[0] == 0) {
                res.status(500).json({ "status": 'FAILED', "Mensaje": "NO registro el Grupo  Verifique" })
                return
            }
        }
        res.status(200).json({ "status": 'OK' })

    } catch (error) {
        error.origen = 'controllers/grabagrupos'
        httpError(res, error)
    }
}

const getgrupos = async (req, res) => {
    try {
        await sql.connect(config)
        var mysql = "SELECT DISTINCT Catalogo.Grupo  FROM Catalogo WHERE  Catalogo.IDEmpresa =" + req.body.idempresa
        console.log(mysql)
        var result = await sql.query(mysql)
        if (result.rowsAffected[0] == 0) {
            res.status(500).json({ "status": 'FAILED', "Mensaje": "NO hay Grupos en Catalogo, Verifique" })
        } else {
            res.status(200).json({ "status": 'OK', "Catalogo": result.recordset })
        }

    } catch (error) {
        error.origen = 'controllers/getgrupos'
        httpError(res, error)
    }
}

const getcatalogogrupos = async (req, res) => {
    try {
        await sql.connect(config)
        var mysql = "SELECT *  FROM CatalogoGrupos WHERE  CatalogoGrupos.IDEmpresa =" + req.body.idempresa + " AND tipo='" + req.body.tipo + "'"
        var result = await sql.query(mysql)
        if (result.rowsAffected[0] == 0) {
            res.status(500).json({ "status": 'FAILED', "Mensaje": "NO hay Grupos en CatalogoGrupos, Verifique" })
        } else {
            res.status(200).json({ "status": 'OK', "Data": result.recordset })
        }

    } catch (error) {
        error.origen = 'controllers/getgrupos'
        httpError(res, error)
    }
}

const grabacatalogogrupos = async (req, res) => {
    try {
        let mysql
        console.log(req.body)
        await sql.connect(config)
        mysql = "EXEC PA_CreaCatalogoGrupos " + req.body.idempresa + ",'" + req.body.tipo + "','" + req.body.descripcion + "'," + req.body.nododependiente + ",'" + req.body.usuario + "'"
        //console.log(mysql)
        var result = await sql.query(mysql)
        if (result.rowsAffected[0] == 0) {
            res.status(500).json({ "status": 'FAILED', "Mensaje": result.recordset[0].mensaje })
            return
        } else {
            res.status(200).json({ "status": result.recordset[0].OK, "ID": result.recordset[0].ID })
        }

    } catch (error) {
        error.origen = 'controllers/grabagrupos'
        httpError(res, error)
    }
}

const updatecatalogogrupos = async (req, res) => {
    try {
        await sql.connect(config)
        var mysql = "UPDATE CatalogoGrupos Set Descripcion='" + req.body.descripcion + "'"
        mysql +=    " WHERE IDEmpresa=" + req.body.idempresa + " AND Consecutivo=" + req.body.consecutivo
        console.log(mysql)
        result = await sql.query(mysql)
        if (result.rowsAffected[0] == 0) {
            res.status(500).json({ "status": 'FAILED', "Mensaje": 'Actualización NO realizada' })
        } else {
            res.status(200).json({ "status": 'OK', "Mensaje": 'Actualización realizada' })
        }

    } catch (error) {
        error.origen = 'controllers/updatecatalogogrupos'
        httpError(res, error)
    }
}

module.exports = {
    capturagrupos,
    grabagrupos,
    getgrupos,
    getcatalogogrupos,
    grabacatalogogrupos,
    updatecatalogogrupos
}