
require('dotenv').config 
const express = require("express");
//const mqtt = require('mqtt');
const sql = require('mssql');
const morgan = require("morgan");
const cors = require("cors");
const colors = require("colors");
const bot = require("./utilidades/telegram.js")

//instances
const PORT=process.env.PORT || 4001
const app = express();

//express config
app.use(morgan("tiny"));
app.use(express.json());
app.use(
    express.urlencoded({
    extended: true
  })
);
app.use(cors());
app.use(express.static("src/storage"))

//express routes 
app
  .use("/api/v1", require("./routes/usuarios.js"))
  .use("/api/v1", require("./routes/bodegas.js"))
  .use("/api/v1", require("./routes/catalogo.js"))

  .use("/api/v1", require("./routes/utilidades.js"))
  .use("/api/v1", require("./routes/storage.js"))
  .use("/api/v1", require("./routes/gruposItem.js"))

  .use("/api/v1", require("./routes/iva.js"))

  //listener
  .listen(PORT, () => {
  console.log("API server listening on port 4001");
}); 

//bot.sendBot("1228075428", "Hola desde Index")

setInterval(( )=> {
  //middleware.ActivacionRevision(30)
}, 1000*60*60*24);



module.exports = app;