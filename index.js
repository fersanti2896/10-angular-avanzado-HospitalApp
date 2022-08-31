
require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');

/* Creando el servidor de express */
const app = express();

/* Configuración a CORS */
app.use( cors() );

/* Conexion a DB */
dbConnection();

/* Rutas */
app.get( '/', (req, res) => {
    res.json({
        ok: true,
        msg: 'Hola mundo'
    })
})

app.listen( process.env.PORT, () => {
    console.log('Servidor corriendo en', process.env.PORT);
} );