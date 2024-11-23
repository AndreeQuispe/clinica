const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 3001;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Conexión a la base de datos MySQL
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'pma',      // Cambia 'root' por 'pma'
    password: '',     // Si 'pma' no tiene contraseña, déjalo vacío
    database: 'clinica_saludable'
});

connection.connect((err) => {
    if (err) {
        console.error('Error conectando a la base de datos: ' + err.stack);
        return;
    }
    console.log('Conectado a la base de datos MySQL como id ' + connection.threadId);
});

// Rutas
app.get('/api/pacientes', (req, res) => {
    connection.query('SELECT * FROM tb_paciente', (error, results) => {
        if (error) throw error;
        res.json(results);
    });
});

app.get('/api/usuarios', (req, res) => {
    connection.query('SELECT * FROM tb_docente', (error, results) => {
        if (error) throw error;
        res.json(results);
    });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
