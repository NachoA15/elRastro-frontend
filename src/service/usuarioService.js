import Axios from 'axios';

import {googleLogout} from "@react-oauth/google";
import routerService from "./routerService.js";

const getUsuarioByCorreo = async (correo, setUsuario) => {
    await Axios.get("https://el-rastro-a7-backend.vercel.app/api/v2/usuarios?correo=" + correo,
        {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        }).then((res) => {
        setUsuario(res.data)
    }).catch((error) => {
        if (error.response.status === 401) {
            usuarioService.logOut(true)
        }
    });
}

const getValoraciones = async (correo, setValoraciones) => {
    await Axios.get("https://el-rastro-a7-backend.vercel.app/api/v2/usuarios/valoracion?correo=" + correo,
        {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
        .then((res) => {
            setValoraciones(res.data)
        }).catch((error) => {
            if (error.response.status === 401) {
                usuarioService.logOut(true)
            }
        });
}

const getRating = async (correo, setRating) => {
    await Axios.get("https://el-rastro-a7-backend.vercel.app/api/v2/usuarios/valoracionMedia?correo=" + correo,
        {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
        .then((res) => {
            setRating(res.data)
        }).catch((error) => {
            if (error.response.status === 401) {
                usuarioService.logOut(true)
            }
        });
}

const logOut = async (badToken) => {
    console.log("LogOut");
    Axios.post("https://el-rastro-a7-backend.vercel.app/api/v2/usuarios/logOut", {},
        {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        }).catch(error => {
        console.log(error.data)
    });
    googleLogout();
    localStorage.clear();
    if (badToken) {
        window.alert("Token de sesion no valido, se ha cerrado la sesion")
    }
    routerService.moveToMainPage();
}

const addValoracion = async (valoracionFormData) => {
    try {
        const response = await Axios.put("https://el-rastro-a7-backend.vercel.app/api/v2/usuarios/valoracion", valoracionFormData,
            {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            }).catch(error => {
            if (error.response.status === 401) {
                usuarioService.logOut(true)
            }
        });
    } catch (error) {
        console.error('Error al enviar la valoracion:', error);
    }
};


const usuarioService = {getValoraciones, getRating, getUsuarioByCorreo, addValoracion, logOut}

export default usuarioService;