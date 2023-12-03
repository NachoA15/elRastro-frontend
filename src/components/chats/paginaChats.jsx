import React, { useEffect, useState } from 'react';
import Talk from 'talkjs';
import Chat from './Chat';

const App = () => {

  const [chats, setChats] = useState([]);

  useEffect(() => {
    const initializeTalkJS = async () => {
      try {
        await Talk.ready;
        const talkSession = new Talk.Session({
          appId: 'tvYAZZjb',
          me: new Talk.User({
            id: '2',
            name: 'Nombre del Usuario',
            email: 'correo@usuario.com',
          }),
        });
        const appId = 'tvYAZZjb';
        const userId = '2';
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

  const handleChatClick = (chatId) => {
    // Lógica para manejar el clic en un chat
    console.log(`Chat clicado: ${chatId}`);
  };


  return (
    <div>
      <h2>Mis chats</h2>
      {chats.map((chat) => (
        <ClickableChat
          key={chat.id}
          chat={chat}
          onClick={() => handleChatClick(chat.id)}
        />
      ))}
    </div>
  );
};

const ClickableChat = ({ chat, onClick }) => {
  return (
    <div onClick={onClick} style={{ cursor: 'pointer', padding: '10px', borderBottom: '1px solid #ccc' }}>
      <h6>{chat.id}</h6>
    </div>
  );
};

export default App;