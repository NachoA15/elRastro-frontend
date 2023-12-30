import React, { useEffect, useState } from 'react';
import NavBar from '../NavBar';
import {
  TextField,
} from '@mui/material';
import productoService from '../../service/productoService';
import UploadWidget from '../cloudinary/uploadWidget';
import Swal from 'sweetalert2'
import routerService from '../../service/routerService';
import { useParams } from 'react-router-dom';

export default function upload_product() {
  const correo = localStorage.getItem("email") || "";
  const params = useParams();
  const idProducto = params.idProducto;

  const [producto, setProducto] = useState('');
  const [nombreProducto, setNombreProducto] = useState('');
  const [precioProducto, setPrecioProducto] = useState('');
  const [codigoPostalProducto, setCodigoPostalProducto] = useState('');
  const [descripcionProducto, setDescripcionProducto] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [imageURL, setImageURL] = useState('');

  useEffect(() => {
    if (idProducto) {
      productoService.getProductoById(setProducto, idProducto);
    }
  }, [idProducto]);

  useEffect(() => {
    if (producto) {
      setNombreProducto(producto.nombre || '');
      setPrecioProducto(producto.precioInicial || '');
      setCodigoPostalProducto(producto.direccion || '');
      setDescripcionProducto(producto.descripcion || '');

      if (producto.fechaCierre) {
        const fechaProductoFormateada = new Date(producto.fechaCierre).toISOString().split('T')[0];
        setSelectedDate(fechaProductoFormateada);
      } else {
        setSelectedDate('');
      }

      setImageURL(producto.imagen || '');
    }
  }, [producto]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleImageUpload = (imageUrl) => {
    setImageURL(imageUrl);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value;
    let precio = document.getElementById('precio').value;
    const descripcion = document.getElementById('descripcion').value;
    const codPostal = document.getElementById('codPostal').value;

    console.log("HOLA")

    if (nombre !== '' && precio !== '') {
      const anuncio = {
        id: idProducto,
        nombre: nombre,
        precioInicial: precio,
        descripcion: descripcion,
        direccion: codPostal,
        usuario: correo,
        imagen: imageURL,
        fechaCierre: selectedDate
      };

      const resultado = idProducto
        ? await productoService.updateProduct(anuncio)
        : await productoService.addProduct(anuncio);

      if (resultado.status === 409) {
        Swal.fire({
          icon: 'error',
          title: idProducto ? 'No se puede actualizar el producto' : 'No se puede publicar el producto',
          text: resultado.mensaje
        });
      } else {
        Swal.fire({
          icon: 'success',
          title: idProducto ? 'Producto actualizado con éxito' : 'Producto publicado con éxito'
        }).then((result) => {
          if (result.isConfirmed) {
            routerService.moveToProductos();
          }
        });
      }
    } 
  };


  return (
    <>
      <NavBar ubicacion={'Subir Producto'} />
      <br />
      <br />
      <div className="container">
        <section className="panel panel-default">
          <div id="addProductForm">
            <form onSubmit={handleSubmit}>
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
                          <TextField
                            required
                            id="nombre"
                            label="Nombre del producto"
                            variant="standard"
                            size="small"
                            value={nombreProducto}
                            onChange={(e) => setNombreProducto(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col-md-2"></div>
                    </div>
                    <br/>

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
                            value={precioProducto}
                            onChange={(e) => {setPrecioProducto(e.target.value)}}
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
                            value={codigoPostalProducto}
                            onChange={(e) => {setCodigoPostalProducto(e.target.value)}}
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
                          <UploadWidget setImageUrl={handleImageUpload} />
                        </div>
                        {imageURL && (
                          <div>
                            <img src={imageURL} alt="Producto" style={{ maxWidth: '100%', marginTop: '10px' }} />
                          </div>
                        )}
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
                            value={descripcionProducto}
                            onChange={(e) => {setDescripcionProducto(e.target.value)}}
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
  );
}
