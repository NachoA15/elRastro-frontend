import productoService from '../../service/productoService';
import React, { useEffect, useState } from 'react';
import '../../assets/css/pujas.css';
import NavBar from '../NavBar';
import usuarioService from '../../service/usuarioService';
import routerService from '../../service/routerService'

const Puja = ({ index, puja, usuario}) => {

    const [producto, setProducto] = useState({});

    useEffect(() => {
      if (puja) {
        productoService.getProductoById(setProducto, puja.producto);
      }
    }, [puja]);

    let cierreSubasta = new Date(producto.fechaCierre);
    let hoy = new Date();
    let subastaCerrada = hoy > cierreSubasta;

    const [usuarioValoracion, setUsuario] = useState({});

    console.log(producto.usuario)

    useEffect(() => {
        if (producto) {
            usuarioService.getUsuarioByCorreo(producto.usuario, setUsuario);
        }
    }, [producto.puja]);

    const valorado =
        producto &&
        producto.puja &&
        producto.puja.usuario &&
        usuarioValoracion.valoracion &&
        Array.isArray(usuarioValoracion.valoracion) &&
        usuarioValoracion.valoracion.find(valoracion => 
            
            valoracion.valorador === puja.usuario && valoracion.producto === producto._id
    );
    console.log(valorado)

   return (
    <>

        
        <tr key={index} style={{borderBottom: '1px solid #ddd'}}>
            <td style={{padding: '0px 10px', textAlign: 'left',}}> 
            
                <div style={{ position: 'relative', display: 'inline-block', marginTop: '30px'}}>
                
                    <img id="img-producto" className="d-flex g-width-50 g-height-50 rounded-circle g-mt-3 g-mr-7" src={producto.imagen} alt={producto.descripcion} style={{ zIndex: 0, marginLeft: '10px'}} />
                    {
                        subastaCerrada?
                        <>
                        
                            <div className='finalizada-aviso-imagen-pujas shadow-sm' style={{marginTop: '-30px', left:'-30', zIndex: 1}}>
                                SUBASTA FINALIZADA
                            </div>
                            
                        </>
                        
                        :
                        <>
                        </>
                    }

                </div>
                <div style={{marginTop: '25px'}}><a href={'/producto/' + producto._id}>{producto.nombre}</a> by <a href={'/usuario/' + producto.usuario}>{producto.usuario}</a></div>
            
            </td>
            
            <td style={{textAlign: 'center'}}>{puja.cantidad}</td>
            
            <td style={{textAlign: 'center'}}>{producto.puja && producto.puja.cantidad}</td>
            <td style={{textAlign: 'right'}}>
            { producto.puja && producto.puja.usuario === usuario && subastaCerrada && producto.puja &&(
                        <button type="button" 
                        className='button-anuncio valora'
                        onClick={() => {routerService.moveToValorarPage(producto._id, producto.puja.usuario, producto.usuario)}}
                        disabled={ valorado !== undefined } 
                        style={{ marginLeft: '100px'}}
                        >
                        Valorar
                        </button>
            )}
            </td>
            <br></br>
        
        </tr>

    
    
    </>
   )
}

export default function Pujas({ pujas, usuario }) {
  
    // Extraer el array de pujas de la propiedad 'pujas'
    const arrayDePujas = pujas && pujas.pujas;

    console.log(pujas.length === 0)
  
    return (
        <>
        <NavBar ubicacion={"Mis Pujas"}/>

        <div className="row" id="titulo-pujas">
            <div className="col-md-12">
                
                <h2 className="product-page-title title">
                Pujas de <a href={'/usuario/' + usuario}>{usuario}</a>
                </h2>

                
                </div>
            </div>
                <table style={{ width: '100%', maxWidth: '800px', borderBottom: '1px solid #ddd' }}>
                {Array.isArray(arrayDePujas) && arrayDePujas.length > 0 ? (
                    <thead>
                    <tr>
                        <th style={{ padding: '0px 200px', textAlign: 'center' }}>Producto</th>
                        
                        <th style={{ padding: '0px 80px', textAlign: 'center' }}>Mi Cantidad Pujada</th>
                        
                        <th style={{ padding: '0px 40px', textAlign: 'center'}}>Cantidad Máxima Pujada</th>
                        
                    </tr>
                    <br></br>
                    </thead>
                ) : ( <th></th>)}
                <tbody>
                {Array.isArray(arrayDePujas) && arrayDePujas.length > 0 ? (
                    arrayDePujas.map((puja, index) => (
                        
                        <Puja key={index} puja={puja} usuario={usuario}></Puja>
                    ))
                    ) : (
                    <tr>
                        El usuario <a href={'/usuario/' + usuario}>{usuario}</a> no tiene actualmente pujas.
                    </tr>
                    )}
                </tbody>
                </table>
            
            
        
          
        </>
    );
  }
  