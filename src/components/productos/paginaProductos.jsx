import React from 'react'
import { useEffect, useState } from 'react'
import productoService from '../../assets/service/productoService';
import NavBar from '../NavBar'

export default function paginaProductos() {
    const [productos, setProductos] = useState([]);
    
    /*useEffect(() => {
        productoService.getProductos(setProductos)
    }, [])*/

    return(
        <>
        <NavBar />
        <h1>Aquí van los productos</h1>
        </>
    )
}