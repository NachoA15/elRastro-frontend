import React from "react";
import { useState, useEffect } from 'react';
import axios from 'axios'
import { googleLogout, useGoogleLogin } from '@react-oauth/google'
import routerService from "../../service/routerService";

export default function GoogleOAuth() {
    const [user, setUser] = useState([]);
    const [profile, setProfile] = useState([]);

    let email = localStorage.getItem('email');

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.log('Login failed: ', error)
    });

    const logOut = () => {
        googleLogout();
        setProfile([]);
        setUser([]);
        localStorage.clear();
        routerService.moveToMainPage();
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
            localStorage.setItem('token', user.access_token)
        }).catch((err) => console.log(err));

        axios.post('https://el-rastro-a7-backend.vercel.app/api/v2/usuarios/checkToken', {}, {
            headers: {
                Authorization: `${user.access_token}`,
                Accept: 'application/json'
            }
        }).then((res) => {
            console.log(res)
            routerService.moveToProductos();
        })
        }
    }, [user]);

    return(
        <>
        {(profile !== undefined && profile.length !== 0) || (email !== null && email.length !== 0)? (
          <div>
              <button onClick={logOut}>Log out</button>
          </div>
        ) : (
            <button onClick={() => {
                login();
            }}>Sign in with Google </button>
        )}
        </>
    )
}