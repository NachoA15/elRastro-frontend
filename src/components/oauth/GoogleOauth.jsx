import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { useEffect, useState } from "react";
import usuarioService from '../../service/usuarioService.js';
export default function GoogleOauth() {
    // Obtener el token del localStorage al cargar el componente
    const initialToken = localStorage.getItem("googleToken") || "";
    const initialUsuario = localStorage.getItem("usuario") || "";
    const initialLogout = localStorage.getItem("logout") || "false";
    const [token, setToken] = useState(initialToken);
    const [usuario, setUsuario] = useState(initialUsuario);
    const [logout, setLogout] = useState(initialLogout);

    useEffect(() => {
        localStorage.setItem("usuario", usuario);
    }, [usuario]);

    // Guardar en localStorage cuando el token cambia
    useEffect(() => {
        localStorage.setItem("googleToken", token);
    }, [token]);

    useEffect(() => {
        localStorage.setItem("logout", logout);
    }, [logout]);

    const logUser = useGoogleLogin({
        onSuccess: tokenResponse => {
            const auxToken = tokenResponse.access_token;
            setToken(auxToken);
            setLogout("false");
            usuarioService.checkToken(auxToken,logOutUser);
            usuarioService.getUsuario(auxToken, setUsuario);
        },
        onError: error => {
            console.log(error);
        }
    });

    //En caso de que la sesion este iniciada va a hacer un checktoken para comprobar si el token ha caducado
    if(token !== "" && usuario !== ""){
        if(logout.localeCompare("true")){ // En caso de que la sesion este iniciada y logout este a true cierra sesion
            logOutUser();
        }
        usuarioService.checkToken(token,logOutUser);
    }



    const logOutUser = () => {
        googleLogout();
        setToken("");
        setUsuario("");
    };

    if (token) {
        return <button onClick={logOutUser}>Cerrar sesión</button>
    } else {
        return <button onClick={logUser}>Iniciar sesión con Google</button>
    }
}


