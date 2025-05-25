import { useState } from "react";
import "../styles/ProductosContainer.css"
import { dispararSweetBasico } from "../assets/SweetAlert";
import { Link } from "react-router-dom";

function Card({producto}){

    return(
        <div className="producto-card" >
            <h2>{producto.name}</h2>
            <Link to={"/productos/"+ producto.id}><img className="producto-image" src={producto.imagen}></img></Link>
            <p>{producto.price} $</p>
            <Link to={"/productos/" + producto.id} ><button>Ver detalles</button></Link>
        </div>
    )
}

export default Card