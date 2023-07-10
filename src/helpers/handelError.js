const bot = require('../utilidades/telegram.js')

const httpError = (res, error) => {
    console.log('Error ' + error.message, 'Origen ' + error.origen)
    var botMessage = error.message + " Origen => " + error.origen 
    bot.sendBot(bot.idChatBaseUno, botMessage)
    res.status(500).json({"status": 'ERROR', "Mensaje" : error.message})
}

module.exports = {httpError}