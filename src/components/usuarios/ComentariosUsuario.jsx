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
    <div id="comentario"className="card-body" style={{height:'70px'}}>
      <div id="valoracion" className="media-body u-shadow-v18 g-bg-secondary g-pa-30" style={{ width: '100%', height:'100%' }}>
                <img id="img" class="d-flex g-width-50 g-height-50 rounded-circle g-mt-3 g-mr-7" src={usuario.imagen} alt="Image Description"></img>
                
                <h5 id="valorador" class="h5 g-color-gray-dark-v1 mb-0"><a href={'/usuario/' + valoracion.valorador}>{valoracion.valorador}</a> - <a href={'/producto/' + valoracion.producto}>{producto.nombre}</a></h5>
                <div id="starsCalidad" className="d-flex flex-row align-items-center">
                    Calidad del producto:
                    <Rating
                        value={valoracion.calidad}
                        edit={false} // set to true if you want it to be interactive
                        isHalf={true} // set to true if you want half stars
                        size={18}
                    />
                </div>

                <br/>

                <div id="starsFiabilidad" className="d-flex flex-row align-items-center">
                    Fiabilidad del producto:
                    <Rating
                        value={valoracion.fiabilidad}
                        edit={false} // set to true if you want it to be interactive
                        isHalf={true} // set to true if you want half stars
                        size={18}
                    />
                </div>
                <div className='lead descripcion'>
                  <p id="descripcion"  style={{maxWidth: '550px', whiteSpace: 'pre-line'}}>{valoracion.descripcion}</p>
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
            <div className="card-body p-2" style={{height: '100%'}}>
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
