const sql = require('mssql');
const {config, options} = require("../routes/config.js")
const {httpError} = require("../helpers/handelError.js")
const bot = require('../utilidades/telegram.js')

const validausuario=async (req, res) => { //LOGIN
    var newData = req.token.user
    const usuario=req.body.usuario
    //console.log(newData)
    try {
        await sql.connect(config)
        var result = await sql.query`Select IdEmpresa, RazonSocial, Estado From Empresas WHERE NIT= ${newData.empresa} AND Aplicacion= ${newData.aplicacion} AND  SerieDisco= ${newData.serie}`
        //console.log(result.recordset[0])
        if(result.recordset[0].Estado == "AU"){
            const IdEmpresa=result.recordset[0].IdEmpresa
            const Rsocial=result.recordset[0].RazonSocial
            if (result.rowsAffected[0] == 0){
                res.status(500).json({ "status": "FALLO", "Mensaje":"Empresa NO resgistrada" })
            }else{
                var result = await sql.query`Select Descripcion, Clave, IdPerfil, Estado From Usuarios WHERE IDEmpresa= ${IdEmpresa} AND IDUsuario= ${usuario}`
                //console.log(result.recordset[0])
                if (result.rowsAffected[0] == 0){
                    res.status(500).json({ "status": "FALLO", "Mensaje":"Usuario NO resgistrada" })
                }else{  
                    if(result.recordset[0].Estado != "AU"){
                        res.status(500).json({ "status": "FALLO", "Mensaje":"Usuario NO Autorizado"})
                    }else{
                        if(result.recordset[0].Clave != req.body.clave){
                            res.status(500).json({ "status": "FALLO", "Mensaje":"Usuario o Clave Errada"})
                        }else{
                            res.status(200).json({"status": 'OK', "IDEmpresa": IdEmpresa, "RazonSocial":Rsocial ,"Usuario" : result.recordset[0]})
                            var botMessage ="Token " + Rsocial + " - " +usuario
                            bot.sendBot(bot.idChatBaseUno, botMessage)
                        }    
                    }    
                }    
            }
        }else{
            res.status(500).json({"status": 'FALLO', "Mensaje" : "Empresa NO esta Autorizada, verifique"})
        }    
    } catch (error) {
        error.origen="Controllers/validausuario"
        httpError(res, err )
    }    
}

const creausuario=async (req, res) => {

    try {
        await sql.connect(config)
        var result = await sql.query`Select Descripcion, Clave, IdPerfil, Estado From Usuarios WHERE IDEmpresa= ${req.body.idempresa} AND IDUsuario= ${req.body.usuario}`
        if (result.rowsAffected[0] == 0){
            result = await sql.query`Set DateFormat DMY Exec dbo.PA_CreaUsuario ${req.body.idempresa}, ${req.body.usuario}, ${req.body.descripcion},  ${req.body.email}, ${req.body.clave}, ${req.body.idperfil}, ${req.body.usuariocrea}`
            res.status(200).json({"status": 'OK'})            
        }else{
            res.status(500).json({"status": 'Fallo', "Mensaje" : "Usuario YA registrado, Verifique"})
        }

    } catch (error) {
        error.origen='controllers/creausuario'
        httpError(res, err)
    }
}

const getempresa=async (req, res) => { 
    var newData = req.token.user
    const usuario=req.body.usuario
    console.log(newData)
    try {
        await sql.connect(config)
        var result = await sql.query`Select * From Empresas WHERE NIT= ${newData.empresa} AND Aplicacion= ${newData.aplicacion}`
        if (result.rowsAffected[0] == 0){
                res.status(500).json({ "status": "No data" })
            }else{
                res.status(200).json({"status": 'OK', "Datos": result.recordset[0]})
            }    console.log(result.recordset[0])
    } catch (error) {
        error.origen='controllers/getempresa'
        httpError(res, err)
    }    
}

const creaRegistro=async (req, res) => {
    var newData = req.body
    var user = {
        empresa: req.body.empresa,
        aplicacion: req.body.aplicacion,
        serie: req.body.serie
    }
    try {
        await sql.connect(config)
        var result = await sql.query`Select IdEmpresa From Empresas WHERE NIT= ${newData.empresa} AND Aplicacion= ${newData.aplicacion} AND  SerieDisco= ${newData.serie}`

        if (result.rowsAffected[0] == 0) {
            res.status(500).json({ "status": "No data" })
        } else {
            var token = jwt.sign({ user }, 'Valentina')
            res.status(200).json({ "status": "OK", "token": token })
        }
        return
    } catch (error) {
        error.origen='controllers/creaRegistro'
        httpError(res, error )
    }
}

module.exports = { validausuario, creausuario, getempresa, creaRegistro}