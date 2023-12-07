import React, { useEffect, useState } from 'react';
import Talk from 'talkjs';
import chatService from '../../service/chatService';
import NavBar from '../NavBar';

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
    <div>
      <h2>Mis chats</h2>
      {chats.map((chat) => (
        <ClickableChat
          key={chat.id}
          chat={chat}
        />
      ))}
    </div>
  );
};

const ClickableChat = ({ chat }) => {
  const handleChatClick = () => {
    chatService.openChat(chat.id);
  };
  return (
    <div onClick={handleChatClick} style={{ cursor: 'pointer', padding: '10px', borderBottom: '1px solid #ccc' }}>
      <h6>{chat.subject}</h6>
    </div>
  );
};

export default App;