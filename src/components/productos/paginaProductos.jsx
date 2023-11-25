import React from 'react'
import { useEffect, useState } from 'react'
import productoService from '../../service/productoService';
import NavBar from '../NavBar'
import Producto from './producto'
import '../../assets/css/productsPage.css'

export default function paginaProductos() {
    const [productos, setProductos] = useState([]);
    
    useEffect(() => {
        productoService.getProductos(setProductos)
    }, [])

    return(
        <>
        <NavBar ubicacion={"Productos"}/>
        
        <div className="container-fluid main-div">
            <div className="row" id='titulo'>
                <div className="col-md-12">
                    {productos.length !== 0? <h2 tabIndex="0"><b>Sección de los productos</b></h2> : <h2 tabIndex="0"><b>No hay ningún producto actualmente en subasta</b></h2>}
                    {/*<Filter anuncios={anuncios} setFiltro={setFiltro} setFiltrando={setFiltrando} filtrando={filtrando}/>*/}
                </div>
            </div>
            <div className='row'>
                <div className='col' style={{backgroundColor: "", width: "100%"}}>
                    <br/>
                    <br/>
                    <div className="item active">
                        <div className="row">
                            {productos.map((producto, key) => {
                                return(
                                    <div className='placement-anuncios' key={key}>
                                        <Producto producto={producto}/>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}