import React from 'react'
import { useEffect, useState } from 'react'
import productoService from '../../service/productoService';
import NavBar from '../NavBar'
import Producto from './producto'
import '../../assets/css/productsPage.css'
import GMap from '../maps/GoogleMap';


export default function paginaProductos({ misProductos }) {
    const usuario = localStorage.getItem("email")
    const [productos, setProductos] = useState([]);
    const [coordenadas, setCoordenadas] = useState([]);
    

    console.log(usuario)

    if (misProductos) {
        useEffect(() => {
            productoService.getProductosByUsuario(setProductos, usuario)
        }, [usuario])
    } else {
        useEffect(() => {
            productoService.getProductos(setProductos)
        }, [])
    }

    useEffect(() => {
        productoService.getCoordenadasListByCodPostal(productos, setCoordenadas)
    }, [productos])
    console.log(coordenadas)

    return(
        <>
        <NavBar ubicacion={misProductos? 'Mis Productos' : "Productos"}/>
        
        <div className="container-fluid main-div">
            <div className="row" id='titulo'>
                <div className="col-md-12">
                    {misProductos? 
                        (
                        productos.length === 0? 
                            <><h2 className='product-page-title title'>No tienes productos registrados actualmente</h2></> 
                        : 
                            <h2 className='product-page-title title'><b>Mis productos</b></h2>
                        )  
                    : 
                        (
                        productos.length !== 0? 
                            <h2 tabIndex="0" className='product-page-title title'><b>Sección de los productos</b></h2> 
                        : 
                            <h2 tabIndex="0" className='product-page-title title'><b>No hay ningún producto actualmente en subasta</b></h2>
                        )
                    }
                    
                    {/*<Filter anuncios={anuncios} setFiltro={setFiltro} setFiltrando={setFiltrando} filtrando={filtrando}/>*/}
                </div>
            </div>
            <div className='row' style={{width: "100%"}}>
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
            <section className="py-5 bg-light">
                <section className='map-section'>
                {coordenadas.length !== 0?
                    <>
                    <GMap locations={[coordenadas]}/>
                    </>
                :
                    <></>
                }
                </section>
                
            </section>
        </div>
        </>
    )
}