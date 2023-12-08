import pujasService from '../../service/pujasService';
import Pujas from './pujas';
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import NavBar from '../NavBar'

export default function paginaPujas() {

    let params = useParams();
    let correo = params.usuario

    const [pujas, setPujas] = useState([]);

    useEffect(() => {
        pujasService.getPujasByUser(correo, setPujas);
    }, [correo]);
    

    return(
        <>
         <div className='container-fluid'>
            <NavBar ubicacion={"Mis pujas"}/>
            {pujas && <Pujas pujas={pujas} usuario={correo}/>}
        </div>
        </>
        
    )

}