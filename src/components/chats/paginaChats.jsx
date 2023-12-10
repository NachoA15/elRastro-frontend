import React, { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';
import Talk from 'talkjs';
import chatService from '../../service/chatService';
import NavBar from '../NavBar';
import '../../assets/css/chatsPage.css'

const paginaChats = () => {

  const [chats, setChats] = useState([]);

  const usuario = localStorage.getItem("email");

  if(usuario === ""){
    window.location.href = "/"
  }

  useEffect(() => {
    const initializeTalkJS = async () => {
      try {
        await Talk.ready;
        const talkSession = new Talk.Session({
          appId: process.env.REACT_APP_ID,
          me: new Talk.User({
            id: usuario,
            name: usuario,
          }),
        });
        const appId = process.env.REACT_APP_ID;
        const userId = usuario;
        const apiKey = process.env.REACT_APP_APIKEY;
        const res = await fetch(
          `https://api.talkjs.com/v1/${appId}/users/${userId}/conversations`,
          {
            headers: {
              Authorization: `Bearer ${apiKey}`,
            },
          }
        );
        const json = await res.json();
        const conversations = json.data;
        setChats(conversations);
        console.log(conversations);
      } catch (error){
        console.error('Error initializing TalkJS: ', error);
      }
    };
    initializeTalkJS();
  }, []);

  return (
    <>
    <NavBar ubicacion={"Mis chats"}/>
    <div className="container-fluid chats-div">
      <div className="row" id="titulo">
        <div className="col-md-12">
          <h2 className='title'><b>Mis chats</b></h2>
        </div>
      </div>
      <br/>
      <br/>
        {chats.map((chat) => (
          <div key={chat.id} className='col-md-4 mx-auto'>
            <ClickableChat chat={chat} />
          </div>
          ))}

    </div>


    </>
  );
};

const ClickableChat = ({ chat }) => {
  const handleChatClick = () => {
    chatService.openChat(chat.id);
  };
  return (
    <>
    <div className='chat' onClick={handleChatClick}>
      <img className='img-chat' src={chat.photoUrl} alt=''/>
      <h6 className='subject-chat'>{chat.subject}</h6>
    </div>
    </>

  );
};

export default paginaChats;