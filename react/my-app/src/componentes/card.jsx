import React from "react";
import '../estilos/card.css';
import imagen1 from '../imagenes/imagen1.png';
import imagen2 from '../imagenes/imagen2.png';
import imagen3 from '../imagenes/imagen3.png';

const imagenes = {
     imagen1,
     imagen2,
     imagen3
};

function Card(props){
    return(
       
        <div className="contenido-card">
            <img className='contenido-card' src={imagenes[props.imagenes]} alt= 'foto de ${props.name}' />
            <div className="contenedor-texto-card">
                <p className='nombre-card'>
                    <strong>{props.nombre}</strong>
                </p>
                <p className="pais-card">
                    {props.pais}
                </p>
                <p className="texto-card">
                    {props.contenido}
                </p>
            </div>
            </div>
    );
}
export default Card;

