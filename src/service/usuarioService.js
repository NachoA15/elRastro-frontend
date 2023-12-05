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

const getUsuario = async (token, setUsuario) => {
    await Axios.get("http://127.0.0.1:5001/usuario/fromToken?token=" + token)
        .then((res) => {
            setUsuario(res.data)
        })
}

const checkToken = (token) => {
    Axios.get("http://127.0.0.1:5001/usuario/checkOrCreate?token=" + token)
        .then((res) => {
            res
        })
}

const addValoracion = async(valoracionFormData) => {
    try{
        const response = await Axios.put("http://127.0.0.1:5001/usuario/valoracion", valoracionFormData);
        console.log(response.data);
    }catch(error){
        console.error('Error al enviar la valoracion:', error);
    }
};

const usuarioService = {getUsuario, checkToken, getValoraciones, getRating, getUsuarioByCorreo, addValoracion}

export default usuarioService;