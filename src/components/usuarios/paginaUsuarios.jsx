import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../NavBar'

import usuarioService from '../../service/usuarioService';
import Usuario from './usuario';
import '../../assets/css/profile.css'


export default function paginaUsuario() {

    const [usuario, setUsuario] = useState([]);
    let params = useParams();
    let correo = params.correo;
    
    useEffect(() => {
        usuarioService.getUsuarioByCorreo(correo, setUsuario);
    }, []);


    const [valoraciones, setValoraciones] = useState([]);
    
    useEffect(() => {
        usuarioService.getValoraciones(correo, setValoraciones);
    }, []);

    const [rating, setRating] = useState([]);

    useEffect(() => {
        usuarioService.getRating(correo, setRating);
    }, []);
    
   

    
    return(
        <>
         <div className='container-fluid'>
            <NavBar ubicacion={usuario.correo === correo ? 'Mi perfil' : ''}/>
            {usuario && <Usuario usuario={usuario} valoraciones={valoraciones.usuario} rating={rating.usuario} />}
        </div>
        </>
        
    )

    
}