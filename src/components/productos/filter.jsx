import React, { useEffect, useState } from "react";
import productoService from "../../service/productoService";
import '../../assets/css/searchbar.css'

export default function Filter({setProductos, misProductos, usuario}) {
    const [filtro, setFiltro] = useState([]);

    useEffect(() => {
        if (filtro.length !== 0) {
            if (misProductos) {
                productoService.filtrarProductos(setProductos, usuario, '', filtro);
            } else {
                productoService.filtrarProductos(setProductos, undefined, '', filtro);
            }
        }
    }, [filtro])

    // Handle the change when the user selects a new value
    const handleFilterChange = (event) => {
        const selectedOption = event.target.value;
        setFiltro(selectedOption);
    };

    return(
        <>
        <div className='row'>
            <label htmlFor="filtro" style={{paddingLeft: "3%", width: "fit-content"}}><h6>Selecciona un filtro:</h6></label>
            <select id="filtroSelect" onChange={handleFilterChange} style={{width:"fit-content"}}>
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
        <div className="box">
            <form name="search" onSubmit={(e) => e.preventDefault()}>
                <input id='searchbar' type="text" className="input" name="buscar" placeholder='Buscar...' aria-label="Campo de entrada para buscar productos" onChange={() => filtrarAnunciosPorCadena(document.getElementById('searchbar').value)}/>
            </form>
            <i className="fa fa-search"></i>
        </div>
        </>
    )
}