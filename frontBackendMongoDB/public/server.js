const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');

const Usuario =require('./usuario.js');


const app = express();
const port = 3600;


app.use(cors());
app.use(express.json());
app.use(express.static("public"));


mongoose.connect('mongodb://202360512_db_user:queso2447@ac-pl96d6r-shard-00-00.kei1rdz.mongodb.net:27017,ac-pl96d6r-shard-00-01.kei1rdz.mongodb.net:27017,ac-pl96d6r-shard-00-02.kei1rdz.mongodb.net:27017/?ssl=true&replicaSet=atlas-usv9tu-shard-0&authSource=admin&appName=Cluster0')
    .then(() => {console.log('Conexión a MongoDB exitosa')})
    .catch(err => console.error('Error al conectar a MongoDB:', err));

app.post('/api/usuarios', async (req, res) => {
    const nuevo = new Usuario({ 
    nombre: req.body.nombre,
    email: req.body.email,
    password: req.body.password,
    genero: req.body.genero,
    plataformas: req.body.plataformas
})
    const guardado = await nuevo.save();
    res.json(guardado);
})
app.get('/api/usuarios', async (req, res) => {
    const usuarios = await Usuario.find();
    res.json(usuarios);
});
app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto http://localhost:${port}`);
});

app.put('/api/usuarios/:id', async (req, res) => {
    const id = req.params.id;
    const actualizado = await Usuario.findByIdAndUpdate(id, {
        nombre: req.body.nombre,
        email: req.body.email,
        password: req.body.password,
        genero: req.body.genero,
        plataformas: req.body.plataformas
    }, { new: true });
    res.json(actualizado);
});