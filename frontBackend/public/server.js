const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const port = 3600;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));
let registros = [
    { id: 1, nombre: 'Juan', email: 'juan@example.com', genero: "masculino", plataforma:"netflix"},
    { id: 2, nombre: 'María', email: 'maria@example.com', genero: "femenino", plataforma:"hbo" },
    { id: 3, nombre: 'Pedro', email: 'pedro@example.com', genero: "masculino", plataforma:"disney+" }
];

let idActual = 3;
app.get('/api/usuarios', (req, res) => {
    res.json(registros);
});
app.post('/api/usuarios', (req, res) => {
    const { nombre, email, genero, plataforma } = req.body;
    if (!nombre || !email || !genero || !plataforma) {
        return res.status(400).json({ error: 'Faltan campos requeridos' });
    }
    idActual++;
    const nuevoRegistro = { id: idActual, nombre, email, genero, plataforma };
    registros.push(nuevoRegistro);
    res.status(201).json(nuevoRegistro);
});
app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto http://localhost:${port}`);
});