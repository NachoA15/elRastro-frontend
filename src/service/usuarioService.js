import Axios from 'axios';

const getUsuarioByCorreo = async (correo, setUsuario) => {
    
    await Axios.get("http://127.0.0.1:5001/usuario?correo=" + correo)
    .then ((res) => {
        setUsuario(res.data)
    })
}

const getValoraciones = async (correo, setValoraciones) => {
    await Axios.get("http://127.0.0.1:5001/usuario/valoracion?correo=" + correo)
    .then ((res) => {
        setValoraciones(res.data)
    })
}

const getRating = async (correo, setRating) => {
    await Axios.get("http://127.0.0.1:5001/usuario/valoracionMedia?correo=" + correo)
    .then ((res) => {
        setRating(res.data)
    })
}

const usuarioService = {getUsuarioByCorreo, getValoraciones, getRating}

export default usuarioService;