import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../NavBar'

import usuarioService from '../../service/usuarioService';
import Usuario from './usuario';
import '../../assets/css/profile.css'


export default function paginaUsuario() {

    let usuario = JSON.parse(localStorage.getItem("usuario") || "{}");

    

    const [user, setUsuario] = useState({});
    let params = useParams();
    let correo = params.correo;

    if(correo !== usuario.correo){
        useEffect(() => {
            usuarioService.getUsuarioByCorreo(correo, setUsuario);
        }, []);
        usuario = user;
    }

    

    const [rating, setRating] = useState([]);

    useEffect(() => {
        usuarioService.getRating(usuario.correo, setRating);
        
    }, [usuario.correo]);
    console.log(usuario)
    
    return(
        <>
         <div className='container-fluid'>
            <NavBar ubicacion={usuario.correo === correo ? 'Mi perfil' : ''}/>
            {usuario && rating && <Usuario usuario={usuario} valoraciones={usuario.valoracion} rating={rating.usuario} />}
        </div>
        </>
        
    )

    

    
}