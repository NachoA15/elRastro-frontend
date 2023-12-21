import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../NavBar';
import {
  TextField,
} from '@mui/material';
import productoService from '../../service/productoService';
import Swal from 'sweetalert2'
import routerService from '../../service/routerService';

export default function updateProducto() {
  const correo = localStorage.getItem("email") || "";
  
  let params = useParams();
  let idProducto = params.idProducto;

  const [producto, setProducto] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedImagePath, setSelectedImagePath] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        // `reader.result` contiene la URL de la imagen
        const imagePath = reader.result;
        setSelectedImagePath(imagePath);
      };

      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    productoService.getProductoById (setProducto, idProducto);
   
  }, []); 


  return (
    <>
      <NavBar />
      <br />
      <br />
      <div className="container">
        <section className="panel panel-default">
          <div id="updateProductForm">
            <form
              onSubmit={async (e) => {
                const nombre = document.getElementById('nombre').value;
                let precio = document.getElementById('precio').value;
                const descripcion = document.getElementById('descripcion').value;
                const codPostal = document.getElementById('codPostal').value;

                if (nombre !== '' && precio !== '') {
                  e.preventDefault();

                  const anuncio = {
                    nombre: nombre,
                    precioInicial: precio,
                    descripcion: descripcion,
                    direccion: codPostal,
                    usuario: correo,
                    imagen: selectedImagePath,
                    fechaCierre: selectedDate
                  };

                  const resultado = await productoService.updateProduct(anuncio);
                  
                  if (resultado.status === 409) {
                    Swal.fire({
                      icon: 'error',
                      title: 'No se puede actualizar el producto',
                      text: resultado.mensaje
                    })
                  } else {
                    Swal.fire({
                      icon: 'success',
                      title: 'Producto actualizado con éxito'
                    }).then((result) => {
                      if (result.isConfirmed) {
                        routerService.moveToProductos();
                      }
                    })
                  }           
                }
              }}
            >
              <br />
              <div className="container center" style={{ maxWidth: 450 }}>
                <div className="card bg-light">
                  <div className="card-body">
                    <div className="row text-center">
                      <h3 className="card-title" tabIndex="0">Introduzca la información del producto:</h3>
                      <h6 tabIndex="0">Los campos obligatorios se muestran con un asterisco (*)</h6>
                    </div>

                    <br />

                    <div className="row text-left">
                      <div className="col-md-2"></div>
                      <div className="col-md-8">
                        <div>
                         {producto &&
                          <TextField
                          required
                          id="nombre"
                          label={producto ? "Nombre del Producto" : "Cargando..."}
                          variant="standard"
                          size="small"
                          
                        />
                        }
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
                            id="precio"
                            label="Precio del producto"
                            variant="standard"
                            size="small"
                            
                            inputProps={{ inputMode: 'numeric', pattern: '[0-9,.]*' }}
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
                            id="codPostal"
                            label="Codigo Postal"
                            variant="standard"
                            size="small"
                            inputProps={{ inputMode: 'numeric', pattern: '[0-9,.]*' }}
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
                            id='imagen'
                            label='Imagen (URL)'
                            variant="standard"
                            size='medium'
                            type="file"
                            onChange={handleImageChange}
                            accept="image/*"
                            multiple={false}
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
                            id="fechaCierre"
                            //label="Fecha de Cierre"
                            type="date"
                            value={selectedDate}
                            onChange={(e) => handleDateChange(e.target.value)}
                            variant="standard"
                            size="small"
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
                            id="descripcion"
                            label="Descripción del producto"
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
              <br />
            </form>
          </div>
        </section>
      </div>
    </>
  )
}
