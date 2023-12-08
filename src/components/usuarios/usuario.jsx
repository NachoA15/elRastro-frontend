import ComentariosUsuario from './ComentariosUsuario';
import '../../assets/css/profile.css';
import Rating from 'react-rating-stars-component';



export default function Usuario({ usuario, valoraciones, rating}) {
    
    return (
        <>
            <section id="usuario" className="vh-100">
                <div className="container-fluid py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col col-lg-12 mb-12 mb-lg-12">
                            <div className="card mb-2">
                                <div className="row g-0">
                                    <div id="perfil" className="col-md-6 gradient-custom text-center">
                                        <img id="img-perfil" src={usuario.imagen}
                                            alt={usuario.imagen} className="img-fluid my-5" />
                                        <h4>{usuario.correo}</h4>
                                        <p>{usuario.nombre}</p>
                                        <div className="d-flex flex-row align-items-center">
                                        {rating !== undefined && rating !== null && (
                                            <Rating
                                            value={rating}
                                            edit={false} // set to true if you want it to be interactive
                                            isHalf={true} // set to true if you want half stars
                                            size={25}
                                            />
                                        )}
                                        </div>
                                    </div>
                                    <div className="col-md-9">
                                        <div className="card-body p-4">
                                            {usuario !== null && <h3>Comentarios <ComentariosUsuario valoraciones={valoraciones}></ComentariosUsuario></h3>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
