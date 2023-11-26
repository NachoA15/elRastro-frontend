import Axios from 'axios';

const getProductos = (setProductos) => {
    Axios.get("http://127.0.0.1:5001/producto")
    .then((res) => {
        setProductos(res.data.productos)
    })
}

const getProductosByUsuario = (setProductos, usuario) => {
    Axios.get("http://127.0.0.1:5001/producto?usuario=" + usuario)
    .then((res) => {
        setProductos(res.data.productos)
    })
}

const getProductoById = (setProductos, id) => {
    Axios.get("http://127.0.0.1:5001/producto?id=" + id)
    .then((res) => {
        setProductos(res.data.producto)
    })
}

const productoService = {getProductos, getProductosByUsuario, getProductoById}

export default productoService;