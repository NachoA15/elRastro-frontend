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
        <header className="bg-dark py-5">
            <div className="container px-4 px-lg-5 my-5">
                <div className="text-center text-white">
                    <h1 className="display-4 fw-bolder">
                        {
                            misProductos? (
                                'Mis productos'
                            )
                            : (
                                'Sección de los productos'
                            )
                        }
                    </h1>
                    <p className="lead fw-normal text-white-50 mb-0">
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
        <section className="py-5">
            <Filter setProductos={setProductos} setFiltrando={setFiltrando} usuario={usuario} misProductos={misProductos}></Filter>
        </section>
        <section className="py-5">
            <div className="container px-4 px-lg-5 mt-5">
                <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                    {
                        productos.map((producto, key) => {
                            return <Producto producto={producto}/>
                        })
                    }
                </div>
            </div>
        </section>
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
        {/*<!-- Footer-->*/}
        <footer className="py-5 bg-dark">
            <div className="container"><p className="m-0 text-center text-white">Copyright &copy; elRastro</p></div>
        </footer>
        </>
    )

}