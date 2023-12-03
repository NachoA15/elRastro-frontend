import React from 'react';
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import NavBar from "../NavBar";
import productoService from "../../service/productoService";
import Swal from 'sweetalert2';
import '../../assets/css/productPage.css'

export default function PaginaProducto() {

    const [producto, setProducto] = useState([]);

    let param = useParams();
    let idProducto = param.id;

    useEffect(() => {
        productoService.getProductoById(setProducto, idProducto);
    }, [producto])

    let cierreSubasta = new Date(producto.fechaCierre);
    let hoy = new Date();
    let subastaCerrada = hoy > cierreSubasta;

    let diffTime = Math.abs(hoy - cierreSubasta);
    let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return(
        <>
        <NavBar />
        <section className="py-5">
            <div className="container px-4 px-lg-5 my-5">
                <div className="row gx-4 gx-lg-5 align-items-center">
                    <div className="col-md-4" style={{height: "500px"}}>
                        {
                            subastaCerrada?
                            <>
                            <div className='finalizada-aviso shadow-sm'>
                                SUBASTA FINALIZADA
                            </div>
                            </>
                            :
                            <>
                            </>
                        }
                        <img className="card-img-top mb-5 mb-md-0 img-producto" src={producto.imagen} alt={producto.descripcion} />
                    </div>
                    <div className='col-md-2' />
                    <div className="col-md-6 info-producto">
                        <div className="small mb-1"><a href={'/perfil/' + producto.usuario}>{producto.usuario}</a></div>
                        <h1 className="display-5 fw-bolder">{producto.nombre}</h1>
                        <hr/>
                        <p className="lead descripcion">{producto.descripcion}</p>
                        <hr/>
                        <div className="fs-5 mb-5" style={{float: "left"}}>
                                <div><p style={{float: 'left'}}>Subasta iniciada con un precio de {producto.precioInicial} €</p></div>
                                <div>
                                    {
                                        subastaCerrada?
                                        <p style={{float: 'left'}}>Esta subasta ya está cerrada.</p>
                                        :
                                        <p style={{float: 'left'}}>Esta subasta termina el {cierreSubasta.toString().substring(7, 10)} {cierreSubasta.toString().substring(4,7)} {cierreSubasta.toString().substring(11,15)} (Quedan {diffDays} días). </p>
                                    }
                                </div>
                        </div>
                        <div className="container-fluid bg-trasparent my-4 p-3"> 
                            <div className="row row-cols-1 row-cols-xs-2 row-cols-sm-2 row-cols-lg-4 g-3" style={{height: "170px"}}> 
                                <div className="col puja-container"> 
                                    <div className="card h-100 shadow-sm"> 
                                        <div className="label-top shadow-sm">{
                                            subastaCerrada?
                                            'Subasta finalizada'
                                            :
                                            'Puja más alta'
                                        }</div> 
                                        <div className="card-body"> 
                                            <div className="clearfix mb-3"> 
                                                {
                                                    producto.puja !== undefined && producto.puja != {}?
                                                    <><span className="float-start badge rounded-pill bg-danger" style={{fontSize: "30px"}}>{producto.puja.cantidad}&euro;</span>
                                                    <br/>
                                                    <span style={{float: 'right'}}>Realizada el {producto.puja.fecha.toString().substring(0,10).replaceAll('-', '/')} a las {producto.puja.fecha.toString().substring(11,16)}</span></>
                                                    :
                                                    <><p>Aún no se ha realizado ninguna puja sobre este producto</p></>
                                                }
                                            </div> 
                                            {!subastaCerrada?
                                                <>
                                                <div className="text-center my-4"> 
                                                    <a href="#" className="btn btn-warning" onClick={() => {
                                                        Swal.fire({
                                                            icon: 'info',
                                                            title: 'Vas a realizar una puja',
                                                            text: 'Va a pujar sobre el producto ' + producto.nombre + '. Por favor, entienda que al '
                                                            + 'realizar esta operación se compromete a pagar la cantidad pujada en caso de ser el ganador '
                                                            + 'de la subasta en un plazo menor a 7 días. En caso de no ser así, se le penalizará en esta '
                                                            + 'aplicación.'
                                                        })
                                                    }}><b>Pujar</b></a> 
                                                </div> 
                                                </>
                                                :
                                                <>                                                
                                                <div className="text-center my-4"> 
                                                    <a href="#" className="btn btn-secondary" style={{cursor: "default"}}><b>Pujar</b></a> 
                                                </div> 
                                                </>
                                            }
                                        </div> 
                                    </div> 
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        
        <section className="py-5 bg-light">
            <div className="container px-4 px-lg-5 mt-5">
                <h2 className="fw-bolder mb-4">Related products</h2>
                <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                    <div className="col mb-5">
                        <div className="card h-100">
                            
                            <img className="card-img-top" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="..." />
                            
                            <div className="card-body p-4">
                                <div className="text-center">
                                    
                                    <h5 className="fw-bolder">Fancy Product</h5>
                                    
                                    $40.00 - $80.00
                                </div>
                            </div>
                            
                            <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                <div className="text-center"><a className="btn btn-outline-dark mt-auto" href="#">View options</a></div>
                            </div>
                        </div>
                    </div>
                    <div className="col mb-5">
                        <div className="card h-100">
                            
                            <div className="badge bg-dark text-white position-absolute" style={{top: '0.5rem', right: '0.5rem'}}>Sale</div>
                            
                            <img className="card-img-top" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="..." />
                            
                            <div className="card-body p-4">
                                <div className="text-center">
                                    
                                    <h5 className="fw-bolder">Special Item</h5>
                                    
                                    <div className="d-flex justify-content-center small text-warning mb-2">
                                        <div className="bi-star-fill"></div>
                                        <div className="bi-star-fill"></div>
                                        <div className="bi-star-fill"></div>
                                        <div className="bi-star-fill"></div>
                                        <div className="bi-star-fill"></div>
                                    </div>
                                    
                                    <span className="text-muted text-decoration-line-through">$20.00</span>
                                    $18.00
                                </div>
                            </div>
                            
                            <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                <div className="text-center"><a className="btn btn-outline-dark mt-auto" href="#">Add to cart</a></div>
                            </div>
                        </div>
                    </div>
                    <div className="col mb-5">
                        <div className="card h-100">
                            
                            <div className="badge bg-dark text-white position-absolute" style={{top: '0.5rem', right: '0.5rem'}}>Sale</div>
                            
                            <img className="card-img-top" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="..." />
                            
                            <div className="card-body p-4">
                                <div className="text-center">
                                    
                                    <h5 className="fw-bolder">Sale Item</h5>
                                    
                                    <span className="text-muted text-decoration-line-through">$50.00</span>
                                    $25.00
                                </div>
                            </div>
                            
                            <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                <div className="text-center"><a className="btn btn-outline-dark mt-auto" href="#">Add to cart</a></div>
                            </div>
                        </div>
                    </div>
                    <div className="col mb-5">
                        <div className="card h-100">
                            
                            <img className="card-img-top" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="..." />
                            
                            <div className="card-body p-4">
                                <div className="text-center">
                                    
                                    <h5 className="fw-bolder">Popular Item</h5>
                                    
                                    <div className="d-flex justify-content-center small text-warning mb-2">
                                        <div className="bi-star-fill"></div>
                                        <div className="bi-star-fill"></div>
                                        <div className="bi-star-fill"></div>
                                        <div className="bi-star-fill"></div>
                                        <div className="bi-star-fill"></div>
                                    </div>
                                    
                                    $40.00
                                </div>
                            </div>
                            
                            <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                <div className="text-center"><a className="btn btn-outline-dark mt-auto" href="#">Add to cart</a></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        </>
    )
}