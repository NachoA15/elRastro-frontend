import React from "react";
import { useState, useEffect } from 'react';
import axios from 'axios'
import { googleLogout, useGoogleLogin } from '@react-oauth/google'
import routerService from "../../service/routerService";

export default function GoogleOAuth({ perfil }) {
    const [user, setUser] = useState([]);
    const [profile, setProfile] = useState([]);

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.log('Login failed: ', error)
    });

    const logOut = () => {
        googleLogout();
        setProfile([]);
        setUser([]);
        appService.moveToMainPage();
    };

    useEffect(() => {
        if (user.length !== 0) {
        axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
            headers: {
            Authorization: `Bearer ${user.access_token}`,
            Accept: 'application/json'
            }
        }).then((res) => {
            setProfile(res.data);
            localStorage.setItem('email', res.data.email)
        }).catch((err) => console.log(err));
        }
    }, [user]);

    return(
        <>
        {(profile !== undefined && profile.length !== 0) || (perfil !== undefined && perfil.length !== 0)? (
          <div>
              <button onClick={logOut}>Log out</button>
          </div>
        ) : (
            <button onClick={() => {
                login();
                routerService.moveToProductos();
            }}>Sign in with Google </button>
        )}
        </>
    )
}