import React from 'react'
import { useEffect, useState } from 'react'
import productoService from '../../service/productoService';
import NavBar from '../NavBar'
import Producto from './producto'
import '../../assets/css/productsPage.css'
import GMap from '../maps/GoogleMap';


export default function paginaProductos({ misProductos }) {
    const usuario = localStorage.getItem("email")
    const filterSelected = localStorage.getItem("filter") || "Fecha_Desc";
    const [productos, setProductos] = useState([]);
    const [coordenadas, setCoordenadas] = useState([]);
    const [filtro, setFiltro] = useState(filterSelected);


    console.log(usuario)

    useEffect(() => {
        if (misProductos) {

            productoService.getProductosByUsuario(setProductos, usuario);

        } else {
            switch (filtro) {
                case "Fecha_Asc":
                    productoService.getProductos(setProductos, "Fecha_Asc");
                    break;
                case "Fecha_Desc":
                    productoService.getProductos(setProductos, "Fecha_Desc");
                    break;
                case "Precio_Asc":
                    productoService.getProductos(setProductos, "Precio_Asc");
                    break;
                case "Precio_Desc":
                    productoService.getProductos(setProductos, "Precio_Desc");
                    break;
                case "Puja_Asc":
                    productoService.getProductos(setProductos, "Puja_Asc");
                    break;
                case "Puja_Desc":
                    productoService.getProductos(setProductos, "Puja_Desc");
                    break;
                case "Activa":
                    productoService.getProductos(setProductos, "Activa");
                    break;
                case "Finalizada":
                    productoService.getProductos(setProductos, "Finalizada");
                    break;
                default:
                    productoService.getProductos(setProductos);
                    break;
            }
        }
    }, [misProductos, usuario, filtro]);
    // Handle the change when the user selects a new value
    const handleFilterChange = (event) => {
        const selectedOption = event.target.value;
        localStorage.setItem("filter", selectedOption)
        setFiltro(selectedOption);
    };


    useEffect(() => {
        localStorage.setItem("filter", filtro)
    }, [filtro])

    useEffect(() => {
        productoService.getCoordenadasListByCodPostal(productos, setCoordenadas)
    }, [productos])
    console.log(coordenadas)

    return(
        <>
        <div className="container-fluid main-div">
            <div className="row">
                <NavBar ubicacion={misProductos? 'Mis Productos' : "Productos"}/>
            </div>
            <br/>
            <br/>
            <br/>
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
            <div className='row'>
                    <label htmlFor="filtro" style={{paddingLeft: "3%", width: "fit-content"}}>Selecciona un filtro:</label>
                    <select id="filtroSelect" onChange={handleFilterChange} value = {filtro} style={{width:"fit-content"}}>
                        <option value="Fecha_Asc">Fecha Ascendente</option>
                        <option value="Fecha_Desc" defaultChecked>Fecha Descendente</option>
                        <option value="Precio_Asc">Precio Ascendente</option>
                        <option value="Precio_Desc">Precio Descendente</option>
                        <option value="Puja_Asc">Última Puja Ascendente</option>
                        <option value="Puja_Desc">Última Puja Descendente</option>
                        <option value="Activa">Activa</option>
                        <option value="Finalizada">Inactiva</option>


                    </select>
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