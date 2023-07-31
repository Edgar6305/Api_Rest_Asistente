// Base de Datos SQL SERVER
const config = {
    user: 'sa',
    password: 'A$123bcd',
    database: 'ASISTENTE',
    server: '18.229.172.128',
    port: 1433,
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 1500
    },
    options: {
        encrypt: false, // for azure
        trustServerCertificate: true // change to true for local dev / self-signed certs
    }
};

// CREDENCIALES MQTT
var options = {
  port: 1883,
  host: '18.229.172.128',
  clientId: 'CIF_DB_Movil_' + Math.round(Math.random() * (0- 10000) * -1) ,
  username: 'web_client',
  password: 'Edgar6305',
  keepalive: 60,
  reconnectPeriod: 1000,
  protocolId: 'MQIsdp',
  protocolVersion: 3,
  clean: true,
  encoding: 'utf8'
};


module.exports = { config, options}