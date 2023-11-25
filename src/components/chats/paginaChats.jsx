import React from 'react'
import { useEffect, useState } from 'react'
import chatService from '../../assets/service/chatService'
import NavBar from '../NavBar';

export default function paginaChats() {
    const [chats, setChats] = useState([]);

    useEffect(() => {
        chatService.getChats(setChats)
    }, [])

    return (
        <>
        <NavBar/>
        <h1>Aquí van los chats</h1>
        </>
    )
}