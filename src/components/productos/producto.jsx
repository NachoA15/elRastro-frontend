import routerService from '../../service/routerService'
import ImageNotFound from '../../assets/images/imagenotfound.jpg'
import usuarioService from '../../service/usuarioService';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';


export default function producto({producto}) {

    let cierreSubasta = new Date(producto.fechaCierre);
    let hoy = new Date();
    let subastaCerrada = hoy > cierreSubasta;

    let diffTime = Math.abs(hoy - cierreSubasta);
    let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    const token = localStorage.getItem("googleToken") || "";
    let params = useParams();
    let usuario = params.usuario;

    const user = localStorage.getItem("email");
    

    
    const [usuarioValoracion, setUsuario] = useState({});

    useEffect(() => {
        if (producto.puja) {
            // Lógica que se ejecuta solo si producto.puja existe
            usuarioService.getUsuarioByCorreo(producto.puja.usuario, setUsuario);
        }
    }, [producto.puja]);
    

    const valorado =
        producto &&
        producto.puja &&
        producto.puja.usuario &&
        usuarioValoracion.valoracion &&
        Array.isArray(usuarioValoracion.valoracion) &&
        usuarioValoracion.valoracion.find(valoracion => 
            valoracion.valorador === producto.usuario && valoracion.producto === producto._id
    );
    

    return (
        <>
        <div className="col mb-5">
            <div className="card h-100">
                {/*<!-- Fecha cierre subasta-->*/}
                <div className={subastaCerrada?  'fecha-cierre cerrada shadow-sm' : (diffDays <= 10? 'fecha-cierre peligro shadow-sm' : 'fecha-cierre abierta shadow-sm')}>
                        Hasta {cierreSubasta.toString().substring(3,15)}
                </div>
                {/*<!-- Product owner --> */}
                Subido por <a href={'/usuario/' + producto.usuario}>{producto.usuario}</a>
                {/*<!-- Product image-->*/}
                {
                    subastaCerrada?
                    <>
                    <div className='finalizada-aviso-imagen shadow-sm'>
                        SUBASTA FINALIZADA
                    </div>
                    </>
                    :
                    <>
                    </>
                }
                <img className="card-img-top" src={producto.imagen !== undefined && producto.imagen !== null? producto.imagen : ImageNotFound} alt="..." onClick={() => routerService.moveToProductPage(producto._id)}/>
                {/*<!-- Product details-->*/}
                <div className="card-body p-4">
                    <div className="text-center">
                        {/*<!-- Product name-->*/}
                        <h5 className="fw-bolder">{producto.nombre}</h5>
                        {/*<!-- Product reviews-->*/}
                        <div className="d-flex justify-content-center small text-warning mb-2">
                            <div className="bi-star-fill"></div>
                            <div className="bi-star-fill"></div>
                            <div className="bi-star-fill"></div>
                            <div className="bi-star-fill"></div>
                            <div className="bi-star-fill"></div>
                        </div>
                        {/*<!-- Product price-->*/}
                        <b>{producto.puja !== undefined && producto.puja != {}? producto.puja.cantidad : producto.precioInicial} &euro;</b>
                    </div>
                </div>
                {/*<!-- Product actions-->*/}
                <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                    <div className="text-center"><a className="btn btn-outline-dark mt-auto" href="#" onClick={() => routerService.moveToProductPage(producto._id)}>Detalles</a></div>
                    <br></br>
                </div>
            </div>
        </div>
        </>
    )
}
