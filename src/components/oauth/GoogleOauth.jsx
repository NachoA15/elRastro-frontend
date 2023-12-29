import React from "react";
import { useState, useEffect } from 'react';
import axios from 'axios'
import {GoogleLogin, googleLogout, useGoogleLogin} from '@react-oauth/google'
import routerService from "../../service/routerService";
import Axios from "axios";

export default function GoogleOAuth() {
    const [user, setUser] = useState([]);
    const [profile, setProfile] = useState([]);

    const perfil = localStorage.getItem('email');

    const login = (credential) =>{
        setUser(credential)
    };

    const logOut = () => {
        googleLogout();
        setProfile([]);
        setUser([]);
        localStorage.clear();
    };

    useEffect(() => {
        if (user.length !== 0) {
            Axios.post('http://localhost:5003/api/v2/usuarios/checkToken',
                {},
                {
                    headers: {
                        Authorization: user,
                        Accept: 'application/json'
                    }
                }
            ).then((res) => {
            setProfile(res.data);
            localStorage.setItem('email', res.data.email)
            localStorage.setItem('token', user)
            routerService.moveToProductos();
        }).catch((err) => console.log(err));
        }
    }, [user]);

    return(
        <>
        {(profile !== undefined && profile.length !== 0) || (perfil !== null && perfil !== undefined && perfil.length !== 0)? (
          <div>
              <a className="btn btn-outline-light btn-lg px-4" href="/" onClick={logOut} style={{fontSize: '15px'}}>Log out</a>
          </div>
        ) : (
            <GoogleLogin
            onSuccess={credentialResponse => {
            login(credentialResponse.credential);
        }}
        onError={() => {
            console.log('Login Failed');
        }}
        useOneTap
        />
        )}
        </>
    )
}