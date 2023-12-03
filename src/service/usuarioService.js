import Axios from 'axios';

const getUsuario = (token) => {
    Axios.get("http://127.0.0.1:5001/usuario/fromToken?token=" + token)
        .then((res) => {
            res
        })
}

const checkToken = (token) => {
    Axios.get("http://127.0.0.1:5001/usuario/checkOrCreate?token=" + token)
        .then((res) => {
            res
        })
}

const usuarioService = {getUsuario, checkToken}

export default usuarioService;