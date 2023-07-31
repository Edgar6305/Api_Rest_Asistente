const sql = require('mssql');
const { config, options } = require("../routes/config.js")
const { httpError } = require("../helpers/handelError.js")
const bot = require('../utilidades/telegram.js')


const creaitem = async (req, res) => {
    try {
        await sql.connect(config)
        var mysql = "EXEC PA_CreaItem " + req.body.idempresa + ",'" + req.body.descripcion + "'," + req.body.fabricante + ","
        mysql += req.body.sku + "," + req.body.generico + "," + req.body.unidad + "," + req.body.grupo + "," + req.body.usuario
        console.log(mysql)
        var result = await sql.query(mysql)
        if (result.rowsAffected[0] == 0) {
            res.status(500).json({ "status": result.recordset[0].OK, "Mensaje": result.recordset[0].Mensaje })
        } else {
            res.status(200).json({ "status": result.recordset[0].OK, "Mensaje": result.recordset[0].Mensaje, "Registro": result.recordset[0].ID })
        }
    } catch (error) {
        error.origen = 'controllers/creaitem'
        httpError(res, error)
    }
}

const getitem = async (req, res) => {
    try {
        //console.log(req.body)
        await sql.connect(config)
        var mysql = "SELECT TOP " + req.body.cuantos + "  Catalogo.* , UnidadesMedida.Descripcion AS DesUnidad FROM  Catalogo INNER JOIN UnidadesMedida ON Catalogo.Unidad = UnidadesMedida.IDUnidad "
        mysql += " WHERE IdEmpresa=" + req.body.idempresa
        var result = await sql.query(mysql)
        if (result.rowsAffected[0] == 0) {
            res.status(500).json({ "status": 'Fallo', "Mensaje": "NO hay Items registradas, Verifique" })
        } else {
            res.status(200).json({ "status": 'OK', "Catalogo": result.recordset })
        }

    } catch (error) {
        error.origen = 'controllers/getitem'
        httpError(res, error)
    }
}

const finditem = async (req, res) => {
    try {
        //console.log(req.body)
        await sql.connect(config)
        var mysql = "SELECT Catalogo.* , UnidadesMedida.Descripcion AS DesUnidad FROM   Catalogo INNER JOIN UnidadesMedida ON Catalogo.Unidad = UnidadesMedida.IDUnidad "
        mysql += "WHERE IdEmpresa=" + req.body.idempresa + " AND IDItem=" + req.body.iditem
        var result = await sql.query(mysql)
        if (result.rowsAffected[0] == 0) {
            res.status(500).json({ "status": 'Fallo', "Mensaje": "NO hay Items registradas, Verifique" })
        } else {
            res.status(200).json({ "status": 'OK', "Catalogo": result.recordset[0] })
        }

    } catch (error) {
        error.origen = 'controllers/getitem'
        httpError(res, error)
    }
}

const findItemExistencia=async (req, res) => {
    try {
        let mysql="SELECT Existencias. *, Bodegas.Descripcion AS Desbodega, GrupoIva.Descripcion AS DesIva "
        mysql+=   "FROM dbo.Existencias INNER JOIN dbo.GrupoIva ON dbo.Existencias.IDGrupoIva = dbo.GrupoIva.IDGrupoIva INNER JOIN "
        mysql+=   "dbo.Bodegas ON dbo.Existencias.IDEmpresa = dbo.Bodegas.IDEmpresa AND dbo.Existencias.IDBodega = dbo.Bodegas.IDBodega "
        mysql+=   "WHERE Existencias.IDEmpresa=" + req.body.empresa + " AND Existencias.IDItem=" + req.body.item
        await sql.connect(config)
        var result = await sql.query(mysql) 
        //console.log(mysql)
        if (result.rowsAffected[0] == 0){
            res.status(200).json({"status": 'NO', "Mensaje" : "Item NO declarado en ninguna Bodega"})
        }else{
            res.status(200).json({"status": 'OK', "Data" : result.recordset})
        }

    } catch (error) {
        error.origen='controllers/findItemExistencia'
        httpError(res, error)
    }
}

const findBodegaItemExistencia=async (req, res) => {
    try {
        let mysql="SELECT Existencias. *, Bodegas.Descripcion AS Desbodega, GrupoIva.Descripcion AS DesIva "
        mysql+=   "FROM dbo.Existencias INNER JOIN dbo.GrupoIva ON dbo.Existencias.IDGrupoIva = dbo.GrupoIva.IDGrupoIva INNER JOIN "
        mysql+=   "dbo.Bodegas ON dbo.Existencias.IDEmpresa = dbo.Bodegas.IDEmpresa AND dbo.Existencias.IDBodega = dbo.Bodegas.IDBodega "
        mysql+=   "WHERE Existencias.IDEmpresa=" + req.body.empresa + " AND Existencias.IDBodega=" + req.body.bodega  + " AND Existencias.IDItem=" + req.body.item 
        await sql.connect(config)
        var result = await sql.query(mysql) 
        console.log(result)
        if (result.rowsAffected[0] == 0){
            res.status(500).json({"status": 'NO', "Mensaje" : "Item NO declarado en esta Bodega"})
        }else{
            res.status(200).json({"status": 'OK', "Data" : result.recordset[0]})
        }

    } catch (error) {
        error.origen='controllers/findBodegaItemExistencia'
        httpError(res, error)
    }
}


const CreaItemExistencia = async (req, res) => {
    try {
        await sql.connect(config)
        var mysql = "EXEC PA_CreaItemExistencia " + req.body.empresa + "," + req.body.bodega + "," + req.body.item + "," + req.body.valorventa + "," + req.body.grupoiva + ","
        mysql    += req.body.minimo + "," + req.body.maximo + ",'" + req.body.ubicacion + "'," + req.body.descuento
        console.log(mysql)
        var result = await sql.query(mysql)
        if (result.rowsAffected[0] == 0) {
            res.status(500).json({ "status": result.recordset[0].OK, "Mensaje": result.recordset[0].Mensaje })
        } else {
            res.status(200).json({ "status": result.recordset[0].OK, "Mensaje": result.recordset[0].Mensaje, "Registro": result.recordset[0].ID })
        }
        console.log(result.recordset[0])
    } catch (error) {
        error.origen = 'controllers/CreaItemExistencia'
        httpError(res, error)
    }
}

const UpdateItemExistencia = async (req, res) => {
    try {
        await sql.connect(config)
        var mysql = "EXEC PA_UpdateItemExistencia " + req.body.empresa + "," + req.body.bodega + "," + req.body.item + "," + req.body.valorventa + "," + req.body.grupoiva + ","
        mysql    += req.body.minimo + "," + req.body.maximo + ",'" + req.body.ubicacion + "'," + req.body.descuento
        console.log(mysql)
        var result = await sql.query(mysql)
        console.log(result)
        if (result.rowsAffected[0] == 0) {
            res.status(500).json({ "status": result.recordset[0].OK, "Mensaje": result.recordset[0].Mensaje })
        } else {
            res.status(200).json({ "status": result.recordset[0].OK, "Mensaje": result.recordset[0].Mensaje, "Registro": result.recordset[0].ID })
        }
    } catch (error) {
        error.origen = 'controllers/UpdeteItemExistencia'
        httpError(res, error)
    }
}

module.exports = {
    creaitem,
    getitem,
    finditem,
    findItemExistencia,
    findBodegaItemExistencia,
    CreaItemExistencia,
    UpdateItemExistencia
 }
