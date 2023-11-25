import Axios from 'axios';

const getProductos = (setProductos) => {
    Axios.get("http://127.0.0.1:5001/producto")
    .then((res) => {
        setProductos(res.data.productos)
    })
}

const productoService = {getProductos}

export default productoService;