import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../NavBar'

import usuarioService from '../../service/usuarioService';
import Usuario from './usuario';
import '../../assets/css/profile.css'


export default function paginaUsuario() {

    const token = localStorage.getItem("googleToken") || "";

    console.log(token)

    const [usuario, setUsuario] = useState({});
    let params = useParams();
    let correo = params.correo;

    if(correo !== usuario.correo){
        useEffect(() => {
            usuarioService.getUsuarioByCorreo(correo, setUsuario);
        }, []);
    }else{
        useEffect(() => {
            usuarioService.getUsuario(token, setUsuario);
        }, []);
    }

    const [valoraciones, setValoraciones] = useState([]);
    
    useEffect(() => {
        usuarioService.getValoraciones(usuario.correo, setValoraciones);
    }, [usuario.correo]);

    const [rating, setRating] = useState([]);

    useEffect(() => {
        usuarioService.getRating(usuario.correo, setRating);
        
    }, [usuario.correo]);
    
    
    return(
        <>
         <div className='container-fluid'>
            <NavBar ubicacion={usuario.correo === correo ? 'Mi perfil' : ''}/>
            {usuario && valoraciones && rating && <Usuario usuario={usuario} valoraciones={valoraciones.usuario} rating={rating.usuario} />}
        </div>
        </>
        
    )

    

    
}