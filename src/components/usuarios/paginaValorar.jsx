import usuarioService from "../../service/usuarioService";
import {
    TextField,
  } from '@mui/material';
import NavBar from '../NavBar';
import { useParams } from 'react-router-dom';

import Rating from 'react-rating-stars-component';
import React, { useEffect, useState } from 'react';

export default function PaginaValorar() {
    let params = useParams();
    let idProducto = params.idProducto;
    let usuarioValorado = params.usuarioValorado;
    let usuarioValorador = params.usuarioValorador;

    const [calidad, setCalidad] = useState(1);
    const [fiabilidad, setFiabilidad] = useState(1);

    const handleRatingChangeCalidad = (newValue) => {
        setCalidad(newValue);
        // Hacer algo con el nuevo valor, si es necesario
        console.log('Nuevo valor de puntuación:', newValue);
    };

    const handleRatingChangeFiabilidad = (newValue) => {
        setFiabilidad(newValue);
        // Hacer algo con el nuevo valor, si es necesario
        console.log('Nuevo valor de puntuación:', newValue);
    };

    return(
        <>
        <NavBar />
        <div className="container" >
            <section className="panel panel-default">
                <div id="addValoracionForm" style={{width: '100%'}}></div>
                    <form 
                         onSubmit={(e) => {
                            const descripcion = document.getElementById('description').value;
                            
                            
                           if(descripcion !== '' && calidad !== '' && fiabilidad !== ''){
                                
                                e.preventDefault();
                                
                                const valoration = {
                                    valoracion:{
                                        calidad: calidad,
                                        fiabilidad: fiabilidad,
                                        descripcion: descripcion
                                    },
                                    valorado: usuarioValorado,
                                    valorador: usuarioValorador,
                                    producto: idProducto
                                };
                                console.log(valoration)
                                usuarioService.addValoracion(valoration);

                                window.location.href = '/productos/' + usuarioValorador;  
                           }

                            
                         }}
                    >
                        <br />
                        <div className="container center" style={{ maxWidth: 700 }}>
                            <div className="card bg-light">
                            <div className="card-body">
                                <div className="row text-center">
                                <h3 className="card-title" tabIndex="0">Introduzca la información de la valoración:</h3>
                                </div>

                                <br />

                                <div className="row text-left">
                                <div className="col-md-1"></div>
                                <div className="col-md-10">
                                    <div>
                                    <div className="d-flex flex-row align-items-center">
                                        
                                        
                                            <>
                                            Calidad del producto:  
                                            
                                            <Rating
                                                required
                                                id="calidad"
                                                value={1} // Valor por defecto establecido en 1
                                                readonly={true}
                                                fractions={2}
                                                onChange={handleRatingChangeCalidad}
                                                size={18}
                                                style={{ float: 'right' }}
                                            />
                                            </>
                                            
                                    </div>
                                    
                                    
                                    </div>
                                </div>
                                <div className="col-md-1"></div>
                                </div>

                                <br />

                                <div className="row text-left">
                                <div className="col-md-1"></div>
                                <div className="col-md-10">
                                    <div>
                                    <div className="d-flex flex-row align-items-center">
                                        
                                            <>
                                            Fiabilidad del producto:  
                                            <Rating
                                                required
                                                id="fiabilidad"
                                                value={1} // Valor por defecto establecido en 1
                                                readonly={true}
                                                fractions={2}
                                                onChange={handleRatingChangeFiabilidad}
                                                size={18}
                                                style={{ float: 'right' }}
                                            />
                                            </>
                                    </div>
                                    
                                    
                                    </div>
                                </div>
                                <div className="col-md-1"></div>
                                </div>

                                <br />
                                

                                <div className="row text-left">
                                    <div className="col-md-1"></div>
                                    <div className="col-md-10">
                                        <div>
                                            <TextField
                                                required
                                                id="description"
                                                label="Descripcion de la valoracion "
                                                variant="standard"
                                                size="small"
                                                multiline
                                                rows={5}
                                                style={{ width: '100%' }}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-1"></div>
                                </div>

                                <br />

                                <div className='container' style={{ maxWidth: 150 }}>
                                    <button type="submit" className="btn btn-outline-primary">Confirmar</button>
                                </div>

                            </div>
                            </div>
                            <br />
                        </div>
                    
                    </form>
            </section>
        </div>
        </>
    )
    
}