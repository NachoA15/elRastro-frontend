import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../NavBar';
import {
  TextField,Input,
} from '@mui/material';
import productoService from '../../service/productoService';
import Swal from 'sweetalert2'
import routerService from '../../service/routerService';

export default function upload_product() {

  const correo = localStorage.getItem("email") || "";

  let params = useParams();
  let idProducto = params.idProducto;

  const [producto, setProducto] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedImagePath, setSelectedImagePath] = useState(null);

  useEffect(() => {
    // Si existe un producto y tiene una fecha, actualiza el estado con la fecha del producto
    if (idProducto && producto.fechaCierre) {
      // La fecha del producto debe estar en un formato reconocible por el campo type="date"
      const fechaProductoFormateada = new Date(producto.fechaCierre).toISOString().split('T')[0];
      setSelectedDate(fechaProductoFormateada);
    } else {
      // Si no existe un producto o no tiene fecha, deja la fecha vacía
      setSelectedDate('');
    }
  }, [idProducto, producto]);

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
    // Si existe un producto y tiene una imagen, actualiza el estado con la imagen del producto
    if (idProducto && producto.imagen) {
      setSelectedImagePath(producto.imagen);
    } else {
      // Si no existe un producto o no tiene imagen, deja la imagen como null
      setSelectedImagePath(null);
    }
  }, [idProducto, producto]);

  if(idProducto){
    useEffect(() => {
    productoService.getProductoById (setProducto, idProducto);
   
    }, []); 
  }

  const [nombreProducto, setNombreProducto] = useState('');

  useEffect(() => {
    // Si hay un producto existente, actualiza el estado con el nombre del producto
    if (idProducto && producto.nombre) {
      setNombreProducto(producto.nombre);
    } else {
      // Si no hay un producto existente, deja el nombre vacío
      setNombreProducto('');
    }
  }, [idProducto, producto]);

  const [precioProducto, setPrecioProducto] = useState('');

  useEffect(() => {
    // Si hay un producto existente, actualiza el estado con el nombre del producto
    if (idProducto && producto.precioInicial) {
      setPrecioProducto(producto.precioInicial);
    } else {
      // Si no hay un producto existente, deja el nombre vacío
      setPrecioProducto('');
    }
  }, [idProducto, producto]);


  const [codigoPostalProducto, setCodigoPostalProducto] = useState('');

  useEffect(() => {
    // Si hay un producto existente, actualiza el estado con el nombre del producto
    if (idProducto && producto.direccion) {
      setCodigoPostalProducto(producto.direccion);
    } else {
      // Si no hay un producto existente, deja el nombre vacío
      setCodigoPostalProducto('');
    }
  }, [idProducto, producto]);

  const [descripcionProducto, setDescripcionProducto] = useState('');

  useEffect(() => {
    // Si hay un producto existente, actualiza el estado con el nombre del producto
    if (idProducto && producto.descripcion) {
      setDescripcionProducto(producto.descripcion);
    } else {
      // Si no hay un producto existente, deja el nombre vacío
      setDescripcionProducto('');
    }
  }, [idProducto, producto]);


  return (
    <>
      <NavBar ubicacion={'Subir Producto'} />
      <br />
      <br />
      <div className="container">
        <section className="panel panel-default">
          <div id="addProductForm">
            <form
              onSubmit={async (e) => {
                const nombre = document.getElementById('nombre').value;
                let precio = document.getElementById('precio').value;
                const descripcion = document.getElementById('descripcion').value;
                const codPostal = document.getElementById('codPostal').value;

                if (nombre !== '' && precio !== '') {
                  e.preventDefault();

                  

                  if(idProducto && producto){
                    const anuncio = {
                      id: idProducto,
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
                    
                  }else{
                    const anuncio = {
                      nombre: nombre,
                      precioInicial: precio,
                      descripcion: descripcion,
                      direccion: codPostal,
                      usuario: correo,
                      imagen: selectedImagePath,
                      fechaCierre: selectedDate
                    };

                    const resultado = await productoService.addProduct(anuncio);

                    if (resultado.status === 409) {
                      Swal.fire({
                        icon: 'error',
                        title: 'No se puede publicar el producto',
                        text: resultado.mensaje
                      })
                    } else {
                      Swal.fire({
                        icon: 'success',
                        title: 'Producto publicado con éxito'
                      }).then((result) => {
                        if (result.isConfirmed) {
                          routerService.moveToProductos();
                        }
                      })
                    }  
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
                        <TextField
                          required
                          id="nombre"
                          label="Nombre del producto"
                          variant="standard"
                          size="small"
                          value={nombreProducto}
                          onChange={(e) => {setNombreProducto(e.target.value)}}
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
                            id="precio"
                            label="Precio del producto"
                            variant="standard"
                            size="small"
                            value={precioProducto}
                            onChange={(e) => {setPrecioProducto(e.target.value)}}
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
                            value={codigoPostalProducto}
                            onChange={(e) => {setCodigoPostalProducto(e.target.value)}}
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
                        {selectedImagePath && (
                          <div>
                            <img src={selectedImagePath} alt="Producto" style={{ maxWidth: '100%', marginTop: '10px' }} />
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
  )
}
