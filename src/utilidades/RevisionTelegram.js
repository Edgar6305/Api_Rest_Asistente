const sql = require('mssql');
const bot = require("../utilidades/telegram")
const {config, options} = require("../routes/config.js")

async function ActivacionRevision(intervalo){
    try {
        console.log("Estoy en ActivacionRevision")
    } catch (err) {
        console.log('Error'+ err)
    }
    return    
}

function makeid(length) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@*?%&$#" 
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }
  

module.exports={
    ActivacionRevision,
    makeid
}