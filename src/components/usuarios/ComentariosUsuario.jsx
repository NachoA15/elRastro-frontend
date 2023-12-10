import Rating from 'react-rating-stars-component';
import '../../assets/css/Comentarios.css';
import productoService from '../../service/productoService';
import React, { useEffect, useState } from 'react';
import usuarioService from '../../service/usuarioService';

const Valoracion = ({ index, valoracion }) => {
  const [producto, setProducto] = useState([]);

  useEffect(() => {
    if (valoracion) {
      productoService.getProductoById(setProducto, valoracion.producto);
    }
  }, [valoracion]);

  const [usuario, setUsuario] = useState([]);

  useEffect(() => {
    if (valoracion) {
      usuarioService.getUsuarioByCorreo(valoracion.valorador, setUsuario);
    }
  }, [valoracion]);

  return (
    <>
    <div key={index} className="card">
    <div id="comentario"className="card-body">
      <div id="valoracion" className="media-body u-shadow-v18 g-bg-secondary g-pa-30" >
          <img id="img-valorador" class="d-flex g-width-50 g-height-50 rounded-circle" src={usuario.imagen} alt="Image Description"></img>
          
          {producto && <h5 id="valorador" class="h5 g-color-gray-dark-v1 mb-0"><a href={'/usuario/' + valoracion.valorador}>{valoracion.valorador}</a> - <a href={'/producto/' + valoracion.producto}>{producto.nombre}</a></h5>}
          
          
          <div id="starsCalidad" className="d-flex flex-row align-items-center">
          <span className="mr-2">Calidad del producto:</span>
              <Rating
                  value={valoracion.calidad}
                  edit={false} // set to true if you want it to be interactive
                  isHalf={true} // set to true if you want half stars
                  style={{
                    fontSize: '1.2rem', // Tamaño predeterminado para pantallas grandes
                    '@media (max-width: 768px)': {
                       fontSize: '0.8rem', // Tamaño para pantallas más pequeñas
                    }
                 }}
              />
          </div>

          <br/>

          <div id="starsFiabilidad" className="d-flex flex-row align-items-center">
              <span className="mr-2">Fiabilidad del producto:</span>
              <Rating
                  value={valoracion.fiabilidad}
                  edit={false} // set to true if you want it to be interactive
                  isHalf={true} // set to true if you want half stars
              />
               
          </div>
          <div className='lead descripcion'>
              <p id="descripcion"  style={{whiteSpace: 'pre-line', textOverflow: 'ellipsis'}}>{valoracion.descripcion}</p>
            </div>
      </div>
        
    </div>
    <br></br>
    </div>
    </>
  );
  
};

export default function ComentariosUsuario({ valoraciones }) {
  

  return (
    <>
      <div className="row d-flex justify-content-center" >
        <div className="col-md-9 col-lg-12">
            <div className="card-body" >
              {Array.isArray(valoraciones) && valoraciones.length > 0 ? (
                valoraciones.map((valoracion, index) => (
                  <Valoracion key={index} valoracion={valoracion} />
                  
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
