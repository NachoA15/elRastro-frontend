import React, { useEffect, useState } from 'react';
import Talk from 'talkjs';
import chatService from '../../service/chatService';
import NavBar from '../NavBar';
import '../../assets/css/chatsPage.css'

const App = () => {

  const [chats, setChats] = useState([]);

  const usuario = JSON.parse(localStorage.getItem("usuario") || "");

  useEffect(() => {
    const initializeTalkJS = async () => {
      try {
        await Talk.ready;
        const talkSession = new Talk.Session({
          appId: 'tvYAZZjb',
          me: new Talk.User({
            id: usuario.correo,
            name: usuario.correo,
          }),
        });
        const appId = 'tvYAZZjb';
        const userId = usuario.correo;
        const apiKey = 'sk_test_1afi8LJyR7BPrOXlMp3VgK4aSniBaf9d';
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
        console.log(conversations)
      } catch (error){
        console.error('Error initializing TalkJS: ', error);
      }
    };
    initializeTalkJS();
  }, []);

  return (
    <>
    <NavBar ubicacion={"Mis chats"}/>
    <div className="container-fluid main-div">
      <div className="row" id="titulo">
        <div className="col-md-12">
          <h2 className='title'><b>Mis chats</b></h2>
        </div>
      </div>
      <br/>
      <br/>
      <div className='row'>
        {chats.map((chat) => (
            <ClickableChat
              key={chat.id}
              chat={chat}
            />
          ))}
      </div>

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

export default App;