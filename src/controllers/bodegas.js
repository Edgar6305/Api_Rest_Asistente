const sql = require('mssql');
const {config} = require("../routes/config.js")
const {httpError} = require("../helpers/handelError.js")

const bodega=async (req, res) => {
    try {
        await sql.connect(config)
        var result = await sql.query`Select * From Bodegas WHERE IDEmpresa= ${req.body.idempresa} AND IDBodega= ${req.body.idbodega}`
        if (result.rowsAffected[0] == 0){
            res.status(500).json({"status": 'FALLO', "Mensaje" : "Bodega NO registrada, Verifique"})
        }else{
            res.status(200).json({"status": 'OK', "Bodega" : result.recordset[0]})
        }

    } catch (error) {
        error.origen='controllers/bodega'
        httpError(res, error)
    }
}

const getbodegas=async (req, res) => {
    try {
        await sql.connect(config)
        var result = await sql.query`Select * From Bodegas WHERE IDEmpresa= ${req.body.idempresa}`
        if (result.rowsAffected[0] == 0){
            res.status(500).json({"status": 'Fallo', "Mensaje" : "NO hay Bodegas registradas, Verifique"})
        }else{
            res.status(200).json({"status": 'OK', "Bodegas" : result.recordset})
        }

    } catch (error) {
        error.origen='controllers/getbodegas'
        httpError(res, error)
    }
}

const updatebodegas=async (req, res) => {
    //console.log(req.body)
    try {
        await sql.connect(config)
        var result = await sql.query`Select * From Bodegas WHERE IDEmpresa= ${req.body.idempresa} AND IDBodega= ${req.body.idbodega}`
        if (result.rowsAffected[0] == 0){
            res.status(500).json({"status": 'FAILED', "Mensaje" : "Bodegas NO registrada, Verifique"})
        }else{
            var mysql = "UPDATE Bodegas Set Descripcion='" + req.body.descripcion + "', TipoBodega='" + req.body.tipobodega + "', Costea=" + req.body.costea + ", Consignacion=" + req.body.consignacion 
            mysql +=    ", RestituyeInventarios=" + req.body.restituye + " WHERE IDEmpresa=" + req.body.idempresa + " AND IDBodega=" + req.body.idbodega
            //console.log(mysql)
            result = await sql.query(mysql) 
            if (result.rowsAffected[0] == 0){
                res.status(500).json({"status": 'FAILED', "Mensaje":'Actualización NO realizada'})
            }else{
                res.status(200).json({"status": 'OK', "Mensaje":'Actualización realizada'})
            }
        }

    } catch (error) {
        error.origen='controllers/updatebodegas'
        httpError(res, error)
    }
}

const borrabodegas=async (req, res) => {
    try {
        await sql.connect(config)
            var result = await sql.query ` EXEC PA_BorraBodegas ${req.body.idempresa} , ${req.body.idbodega}`
            console.log(result.recordset)
            if (result.rowsAffected[0] == 0){
                res.status(500).json({"status": result.recordset[0].OK, "Mensaje": result.recordset[0].Mensaje})
            }else{
                res.status(200).json({"status": result.recordset[0].OK, "Mensaje": result.recordset[0].Mensaje})
            }
    } catch (error) {
        error.origen='controllers/borrabodegas'
        httpError(res, error)
    }
}

const creabodegas=async (req, res) => {
    try {
        console.log(req.body)
        await sql.connect(config)
            var result = await sql.query `EXEC PA_CreaBodegas ${req.body.idempresa} , ${req.body.descripcion}, ${req.body.tipobodega}, ${req.body.costea}, ${req.body.consignacion}, ${req.body.restituye}, ${req.body.usuario} `
            if (result.rowsAffected[0] == 0){
                res.status(500).json({"status": result.recordset[0].OK, "Mensaje": result.recordset[0].Mensaje})
            }else{
                res.status(200).json({"status": result.recordset[0].OK, "Mensaje": result.recordset[0].Mensaje, "Registro" : result.recordset[0].ID})
            }
    } catch (error) {
        error.origen='controllers/creabodegas'
        httpError(res, error)
    }
}

const browsebodega=async (req, res) => {
    try {
        await sql.connect(config)
        var mysql="Select idBodega, descripcion From Bodegas WHERE IDEmpresa=" + req.body.idempresa +  " AND Descripcion LIKE '%" + req.body.clave + "%'"
        console.log(mysql)
        var result = await sql.query(mysql)
        if (result.rowsAffected[0] == 0){
            res.status(500).json({"status": 'FALLO', "Mensaje" : "Bodega NO registrada, Verifique"})
        }else{
            res.status(200).json({"status": 'OK', "Bodegas" : result.recordset})
        }

    } catch (error) {
        error.origen='controllers/browsebodega'
        httpError(res, error)
    }
}


module.exports = { bodega, getbodegas, updatebodegas, borrabodegas, creabodegas, browsebodega}
