const express = require('express');
const cors = require('cors');
const app = express();
const usuarios = require('./routes/usuarios.js');
const reservas = require('./routes/reservas.js');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/usuarios', usuarios);
app.use('/reservas', reservas);

module.exports = app;
