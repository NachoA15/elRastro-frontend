import Axios from 'axios';


const getProductos = async (setProductos, filtro = 'Fecha_Desc') => {
    await Axios.get("http://127.0.0.1:5001/producto?filtro=" + filtro)
    .then((res) => {
        setProductos(res.data.productos)
    })
}

const getProductoById = async (setProducto, idProducto) => {
    await Axios.get("http://127.0.0.1:5001/producto/" + idProducto)
    .then((res) => {
        setProducto(res.data.producto)
    })
}

const getProductosByUsuario = async (setProductos, usuario) => {
    await Axios.get("http://127.0.0.1:5001/producto?usuario=" + usuario)
    .then((res) => {
        setProductos(res.data.productos)
    })
}


const addProduct = async (productoFormData) => {
    try {
        console.log("HOLA")
      const response = await Axios.post("http://127.0.0.1:5001/producto", productoFormData);
      console.log(response.data);
    } catch (error) {
      console.error('Error al enviar el producto:', error);
    }
  };


const deleteProduct = async (producto) => {
    try {
      const response = await Axios.delete("http://127.0.0.1:5001/producto/" + producto);
      console.log(response.data);
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
    }
};

const getCoordenadasByCodPostal = async (producto, setCoordenadas) => {
  try {
    if(producto.direccion && producto.direccion !== 29080){
      await Axios.get('http://127.0.0.1:5001/carbono/coord?codPostal=' + producto.direccion).then((res) => {
        res.data.title = producto.nombre
        setCoordenadas(res.data)
        console.log(res.data)
      })
    }
  } catch (error) {
    console.error(error);
  }
}

const pujar = async (usuario, cantidad, producto) => {
  try {
    await Axios.post('http://127.0.0.1:5001/puja/', {
      usuario: usuario,
      cantidad: cantidad,
      producto: producto
    }).then((res) => {
      return {status: res.status, mensaje: res.data.mensaje}
    })
  } catch (error) {
    return {status: error.response.status, mensaje: error.response.data}
  }
}
const getCoordenadasListByCodPostal = async (productos, setCoordenadas) => {
  try {
    let coordenadas = [];

    for (const producto of productos) {
      if(producto.direccion && producto.direccion !== 29080){
        const response = await Axios.get('http://127.0.0.1:5001/carbono/coord?codPostal=' + producto.direccion);
        response.data.title = producto.nombre
        coordenadas.push(response.data);
      }
      
    }
    setCoordenadas(coordenadas);
  } catch (error) {
    console.error(error);
  }
}

const productoService = {getProductos, getProductosByUsuario, getProductoById, addProduct, deleteProduct, getCoordenadasByCodPostal,getCoordenadasListByCodPostal, pujar}

export default productoService;