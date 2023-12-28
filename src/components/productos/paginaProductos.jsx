import React from 'react'
import { useEffect, useState } from 'react'
import productoService from '../../service/productoService';
import NavBar from '../NavBar'
import Producto from './producto'
import '../../assets/css/productsPage.css'
import GMap from '../maps/GoogleMap';
import Filter from './filter';


export default function paginaProductos({ misProductos }) {
    const usuario = localStorage.getItem("email")
    const [productos, setProductos] = useState([]);
    const [filtrando, setFiltrando] = useState(false);
    const [coordenadas, setCoordenadas] = useState([]);

    useEffect(() => {
        if (misProductos) {
            productoService.getProductosByUsuario(setProductos, usuario);
        } else {
            productoService.getProductos(setProductos);
        }
    }, []);

    useEffect(() => {
        productoService.getCoordenadasListByCodPostal(productos, setCoordenadas)
    }, [productos])

    return(
        <>
        <NavBar ubicacion={misProductos? 'Mis Productos' : "Productos"}/>
        <header class="bg-dark py-5">
            <div class="container px-4 px-lg-5 my-5">
                <div class="text-center text-white">
                    <h1 class="display-4 fw-bolder">
                        {
                            misProductos? (
                                'Mis productos'
                            )
                            : (
                                'Sección de los productos'
                            )
                        }
                    </h1>
                    <p class="lead fw-normal text-white-50 mb-0">
                        {
                            misProductos? (
                                productos.length === 0? (
                                    filtrando? (
                                        'No se ha encontrado ningún producto coincidente con el filtro'
                                    )
                                    : (
                                        'No tienes productos registrados actualmente'
                                    )
                                ) : (
                                    'Aquellos productos publicados por ti'
                                )
                            )
                            : (
                                productos.length === 0? (
                                    filtrando? (
                                        'No se ha encontrado ningún producto coincidente con el filtro'
                                    )
                                    : (
                                        'No hay ningún producto actualmente en subasta'
                                    )
                                ) : (
                                    'Una colección de todos los productos disponibles en elRastro'
                                )
                            )
                        }
                    </p>
                </div>
            </div>
        </header>
        {/*<!-- Section-->*/}
        <section class="py-5">
            <Filter setProductos={setProductos} setFiltrando={setFiltrando} usuario={usuario} misProductos={misProductos}></Filter>
        </section>
        <section class="py-5">
            <div class="container px-4 px-lg-5 mt-5">
                <div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                    {
                        productos.map((producto, key) => {
                            return <Producto producto={producto}/>
                        })
                    }
                </div>
            </div>
        </section>
        {/*<!-- Footer-->*/}
        <footer class="py-5 bg-dark">
            <div class="container"><p class="m-0 text-center text-white">Copyright &copy; elRastro</p></div>
        </footer>
        </>
    )

    /*
    return(
        <>
        <div className="container-fluid main-div">
            <div className="row">
                <NavBar ubicacion={misProductos? 'Mis Productos' : "Productos"}/>
            </div>
            <div className="row" id='titulo'>
                <div className="col-md-12">
                    {misProductos? 
                        (
                        productos.length === 0? 
                            filtrando?
                            <h2 tabIndex="0" className='product-page-title title'>No se ha encontrado ningún producto según el filtro</h2>
                            :
                            <><h2 className='product-page-title title'>No tienes productos registrados actualmente</h2></> 
                        : 
                            <h2 className='product-page-title title'><b>Mis productos</b></h2>
                        )  
                    : 
                        (
                        productos.length !== 0? 
                            <h2 tabIndex="0" className='product-page-title title'><b>Sección de los productos</b></h2> 
                        :  
                            filtrando?
                            <h2 tabIndex="0" className='product-page-title title'>No se ha encontrado ningún producto según el filtro</h2>
                            :
                            <h2 tabIndex="0" className='product-page-title title'><b>No hay ningún producto actualmente en subasta</b></h2>
                        )
                    }
                    
                    <Filter setProductos={setProductos} misProductos={misProductos} usuario={usuario} setFiltrando={setFiltrando}/>
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
    */
}