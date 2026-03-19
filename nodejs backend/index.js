 express = require ('express');
 const app = express();
 const port = 3600;

let data=[
    {id:1, superhero :'batman'},
    {id:2, superhero :'Superman'},
    {id:3, superhero :'ironman'},
]

app.get('/', (req, res) => {
   return res.send('Hola Mundo');
});

app.get('/datos', (req, res) => {
    return res.json(data);
});
app.get('/datos/superman', (req, res) => {
    return res.json(data[1]);
});

app.post("/add", (req, res) => {
    const nuevo_heroe = {
        id: data.length + 1,
        superhero: req.body.superhero
    }
    data.push(nuevo_heroe);
    return res.status(200).json(data);
    });

 app.listen( port,()=>{
console.log("Servidor corriendo en el puerto http://localhost:" + port);
});
