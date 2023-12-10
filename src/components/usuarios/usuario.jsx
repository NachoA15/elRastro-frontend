import ComentariosUsuario from './ComentariosUsuario';
import '../../assets/css/profile.css';
import Rating from 'react-rating-stars-component';



export default function Usuario({ usuario, valoraciones, rating}) {
    
    return (
        <>
            <div className="container-fluid py-5 h-100 d-flex flex-column vh-100 chat-div">
                <div className="row justify-content-center align-items-center">
                <div className="col col-lg-12 mb-12 mb-lg-12 col-sm-12 mb-sm-12">
                    <div id="card-perfil" className="card mb-2 w-100 flex-grow-1">
                    <div className="row w-100">
                                <div id="perfil" className="col-md-4 col-sm-12 gradient-custom text-center">
                                    <img id="img-perfil" src={usuario.imagen}
                                        alt={usuario.imagen} className="img-fluid my-5" />
                                    <h4 id="usuario-correo">{usuario.correo}</h4>
                                    <p id="usuario-nombre" className="mb-3" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{usuario.nombre}</p>
                                    <div className="d-flex flex-row align-items-center">
                                    
                                    {rating !== undefined && rating !== null && (
                                        
                                        <Rating
                                        value={rating}
                                        edit={false} // set to true if you want it to be interactive
                                        isHalf={true} // set to true if you want half stars
                                        size={20}
                                        />
                                    )}
                                    </div>
                                </div>
                                <div className="col-md-8 col-sm-12">
                                    <div className="card-body p-4">
                                        {usuario !== null && <h3>Comentarios <ComentariosUsuario valoraciones={valoraciones}></ComentariosUsuario></h3>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
