import React, { useEffect } from 'react';
import Talk from 'talkjs';
import Chat from './Chat';

const App = () => {

//Iria en el login
  useEffect(() => {
    /*Talk.ready.then(() => {
      const talkSession = new Talk.Session({
        appId: 'tvYAZZjb',
        me: new Talk.User({
          id: '123',
          name: 'Nombre del Usuario',
          email: 'correo@usuario.com',
        }),
      });
    });*/
  }, []);



  return (
    <div>
      <h6>Chat entre Usuario y Vendedor</h6>
      <Chat />
    </div>
  );
};

export default App;