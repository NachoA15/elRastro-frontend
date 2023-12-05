import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { useEffect, useState } from "react";
import usuarioService from '../../service/usuarioService.js';
export default function GoogleOauth() {
    // Obtener el token del localStorage al cargar el componente
    const initialToken = localStorage.getItem("googleToken") || "";
    const initialUsuario = localStorage.getItem("usuario") || "";
    const [token, setToken] = useState(initialToken);
    const [usuario, setUsuario] = useState(initialUsuario);

    useEffect(() => {
        localStorage.setItem("usuario", usuario);
    }, [usuario]);

    // Guardar en localStorage cuando el token cambia
    useEffect(() => {
        localStorage.setItem("googleToken", token);
    }, [token]);

    const logUser = useGoogleLogin({
        onSuccess: tokenResponse => {
            const auxToken = tokenResponse.access_token;
            setToken(auxToken);

            usuarioService.checkToken(auxToken,logOutUser);

            //Si el token se ha validado correctamente se carga el usuario en memoria

            usuarioService.getUsuario(auxToken, setUsuario);


        },
        onError: error => {
            console.log(error);
        }
    });

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


