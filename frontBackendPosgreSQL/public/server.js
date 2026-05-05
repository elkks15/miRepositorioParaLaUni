const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const { createClient } = require('@supabase/supabase-js');


const app = express();
const port = 3000;


app.use(cors());
app.use(express.json());
app.use(express.static("public"));

dotenv.config({ path: path.resolve(__dirname, '../.env') });

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_KEY) {
    console.error('Faltan variables de entorno: SUPABASE_URL y/o SUPABASE_KEY.');
    console.error('Crea /frontBackendPosgreSQL/.env con esas llaves y reinicia npm start.');
    process.exit(1);
}

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
);

if (!supabase) {
    console.error('Error al conectar a Supabase');
} else {
    console.log('Conexión a Supabase exitosa');
}

app.get('/api/usuarios', async (req, res) => {
    const { data, error } =await supabase.from('plataformausuarios').select('*');
    if (error) {
        console.error('Error al obtener usuarios:', error);
        return res.status(500).json({ error: 'Error al obtener usuarios' });
    }
    res.json(data);
});

app.post('/api/usuarios', async (req, res) => {
    const {data, error} = await supabase.from('plataformausuarios')
    .insert([
        {
            nombre: req.body.nombre,
            email: req.body.email,
            genero: req.body.genero,
            plataformas: req.body.plataformas
        }
    ])
    .select();
    if (error) return res.status(500).json(error);
    res.json(data[0]);
});
app.put('/api/usuarios/:id', async (req, res) => {
 const {data, error} = await supabase.from('plataformausuarios')
 .update({
    nombre: req.body.nombre,
    email: req.body.email,
    genero: req.body.genero,
    plataformas: req.body.plataformas
 })
    .eq('id', req.params.id)
    .select();
    if (error) return res.status(500).json(error);
    res.json(data[0]);
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});