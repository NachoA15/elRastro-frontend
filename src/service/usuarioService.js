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
    let result = await Axios.get("http://127.0.0.1:5001/usuario/checkOrCreate?token=" + token);
    if(result.status === 200){
        setUsuario(JSON.stringify(result.data));
    }

}

const checkToken = async (token,logOutUser) => {
    let result = await Axios.get("http://127.0.0.1:5001/usuario/checkToken?token=" + token)

    //En caso de que el token no sea valido se cierra la sesion
    if(result.status !== 200){
        logOutUser();
    }

}

const usuarioService = {getUsuario, checkToken, getUsuarioByCorreo, getValoraciones, getRating}

export default usuarioService;