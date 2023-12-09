import React from 'react'
import GoogleOAuth from '../oauth/GoogleOauth'
import '../../assets/css/IntroPage.css'

export default function IntroPage() {
    return (
        <>
        <h1>elRastro</h1>
        <GoogleOAuth />
        </>
    )
}