import usuarioService from "../../service/usuarioService";
import {
    TextField,
  } from '@mui/material';
import NavBar from '../NavBar';
import { useParams } from 'react-router-dom';

export default function PaginaValorar() {
    let params = useParams();
    let idProducto = params.idProducto;
    let usuarioValorado = params.usuarioValorado;
    let usuarioValorador = params.usuarioValorador;
    

    return(
        <>
        <NavBar />
        <div className="container">
            <section className="panel panel-default">
                <div id="addValoracionForm"></div>
                    <form
                         onSubmit={(e) => {
                            const descripcion = document.getElementById('description').value;
                            let puntuacion = document.getElementById('puntuacion').value;
                            
                           if(descripcion !== '' && puntuacion !== ''){
                                e.preventDefault();
                                
                                const valoration = {
                                    valoracion:{
                                        puntuacion: puntuacion,
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
                        <div className="container center" style={{ maxWidth: 450 }}>
                            <div className="card bg-light">
                            <div className="card-body">
                                <div className="row text-center">
                                <h3 className="card-title" tabIndex="0">Introduzca la información de la valoracion:</h3>
                                <h6 tabIndex="0">Los campos obligatorios se muestran con un asterisco (*)</h6>
                                </div>

                                <br />

                                <div className="row text-left">
                                <div className="col-md-2"></div>
                                <div className="col-md-8">
                                    <div>
                                    <TextField
                                        required
                                        id="puntuacion"
                                        label="Puntuación "
                                        variant="standard"
                                        size="small"
                                        inputProps={{ inputMode: 'numeric', pattern: '[0-5,.]*' }}
                                    />
                                    </div>
                                </div>
                                <div className="col-md-2"></div>
                                </div>

                                <br />
                                

                                <div className="row text-left">
                                    <div className="col-md-2"></div>
                                    <div className="col-md-8">
                                        <div>
                                            <TextField
                                                required
                                                id="description"
                                                label="Descripcion de la valoracion "
                                                variant="standard"
                                                size="small"
                                                multiline
                                                rows={5}
                                             
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-2"></div>
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