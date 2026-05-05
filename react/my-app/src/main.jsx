import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Card from './componentes/card.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Card titulo="Hola mundo React"
    imagenes="imagen1"
    nombre="Eduardo"
    pais="Mexico"
    contenido="Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, voluptate!"
    />
    <Card titulo="Hola mundo React"
    imagenes="imagen2"
    nombre="Eduardo2"
    pais="Mexico2"
    contenido="Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, voluptate!"
    />
    <Card titulo="Hola mundo React"
    imagenes="imagen3"
    nombre="Eduardo3"
    pais="Mexico3"
    contenido="Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, voluptate!"
    />
  </StrictMode>,
)

