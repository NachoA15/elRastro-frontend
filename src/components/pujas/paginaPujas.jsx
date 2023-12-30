import pujasService from '../../service/pujasService';
import Pujas from './pujas';
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import NavBar from '../NavBar'

export default function paginaPujas() {
    const usuario = localStorage.getItem("email")

    const [pujas, setPujas] = useState([]);

    useEffect(() => {
        pujasService.getPujasByUser(usuario, setPujas);
    }, [usuario]);
    

    return(
        <>
        {pujas && <Pujas pujas={pujas} usuario={usuario}/>}
        </>
        
    )

}