import Rating from 'react-rating-stars-component';
import '../../assets/css/Comentarios.css';

export default function ComentariosUsuario({ valoraciones}) {
  return (
    <>
      <div className="row d-flex justify-content-center">
        <div className="col-md-9 col-lg-11">
         
            <div className="card-body p-2" >
              {Array.isArray(valoraciones) && valoraciones.length > 0 ? (
                valoraciones.map((valoracion, index) => (
                  <div  id="comentario" key={index} className="card mb-8" >
                    <div  className="card-body" >
                        
                            <div id="valoracion" class="media-body u-shadow-v18 g-bg-secondary g-pa-30">
                           
                                <img id="img" class="d-flex g-width-50 g-height-50 rounded-circle g-mt-3 g-mr-7" src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Image Description"></img>
                                
                                <h5 id="valorador" class="h5 g-color-gray-dark-v1 mb-0"><a href={'/usuario/' + valoracion.valorador}>{valoracion.valorador}</a></h5>
                                <div id="stars" className="d-flex flex-row align-items-center">
                                    <Rating
                                        value={valoracion.puntuacion}
                                        edit={false} // set to true if you want it to be interactive
                                        isHalf={true} // set to true if you want half stars
                                    />
                                </div>
                            
                        
                            <p id="descripcion">{valoracion.descripcion}</p>
                            </div>
                        
                    </div>
                    </div>
                ))
                
              ) : (

                <div className="card-body" >
                  <p>Este usuario aún no tiene valoraciones.</p>
                </div>
                
              )}
            </div>
          </div>
        </div>
    </>
  );
}
