import React from 'react';
import ImageNotFound from '../../assets/images/imagenotfound.jpg'

export default function producto({producto}) {
  return(
    <>
    <div className='card anuncio' tabIndex="0" aria-label={producto.nombre} style={{boxShadow: "2px 2px 5px"}}>
        <div className='card-header anuncio-header' tabIndex="0">
            Subido por 
            {/*idUsuarioRegistrado === anuncio.idUsuario?
            <> ti</>
            :
            <a href={"/profile/" + anuncio.username}> {anuncio.username}</a>     
            */}
        </div>
        <div className='card-body anuncio-thumbnail' style={{width: '100%'}}>
            <div className='placement-imagen'>
                <img src={producto.imagen !== undefined && producto.imagen !== null? producto.imagen : ImageNotFound} alt={producto.descripcion === null? producto.nombre + '. Este anuncio no tiene descripción.' : producto.nombre + '. Descripción: ' + producto.descripcion} 
                tabIndex="0"/>
            </div>
            <div className='anuncio-info'>
                <p className='nombre-anuncio' tabIndex="0"><b>{producto.nombre}</b></p><br/>
                <p className='precio-anuncio' tabIndex="0">Precio actual: &nbsp; <span class="new-price">{producto.puja !== undefined && producto.puja != {}? producto.puja.cantidad : producto.precioInicial} €</span></p> 
                <p className='precio-anuncio' tabIndex="0">Precio inicial: &nbsp; {producto.precioInicial} €</p> 
                {/*<span style={{float: 'right'}} tabIndex="0">{producto.fechaInicio.toString().substring(0,10)}</span>*/}
            </div>
        </div>
        <div className='card-body' style={{width: '100%', marginTop: "20px", marginBottom: "0px"}}>
            <br/>
            <button className='button-anuncio contacta' onClick={() => {}}>Contacta</button>
            <button className='button-anuncio info' onClick={() => {}}>+ Info</button>
        </div>
    </div>
    </>
  )
}