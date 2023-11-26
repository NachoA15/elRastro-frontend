import React from 'react'
import { useEffect, useState } from 'react'
import productoService from '../../assets/service/productoService';
import NavBar from '../NavBar'

export default function paginaProductos() {
    const [productos, setProductos] = useState([]);
    
<<<<<<< Updated upstream
    useEffect(() => {
        productoService.getProductos(setProductos)
    }, [])
=======
    let params = useParams();
    let usuario = params.usuario;
    if (usuario !== undefined) {
        useEffect(() => {
            productoService.getProductosByUsuario(setProductos, usuario)
        }, [])
    } else {
        useEffect(() => {
            productoService.getProductos(setProductos)
        }, [])
    }
>>>>>>> Stashed changes

    return(
        <>
        <NavBar />
        <h1>Aquí van los productos</h1>
        </>
    )
}