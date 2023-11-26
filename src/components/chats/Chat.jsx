import Talk from 'talkjs';
import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router';
import productoService from '../../service/productoService';

export default function Chat() {
  const chatboxEl = useRef();

  const [talkLoaded, markTalkLoaded] = useState(false);
  const [producto, setProducto] = useState();

  let params = useParams();
  let idConv = params.idConv;
  let idProd = idConv.split("_")[0];
  let idVend = idConv.split("_")[1];
  let idComp = idConv.split("_")[2];

  useEffect(() => {
    productoService.getProductoById(setProducto, idProd);
  }, []);

  useEffect(() => {
    Talk.ready.then(() => markTalkLoaded(true));

    if (talkLoaded) {
      const vendedor = new Talk.User({
        id: idVend
      });

      const comprador = new Talk.User({
        id: idComp
      });

      const session = new Talk.Session({
        appId: 'tvYAZZjb',
        me: vendedor,
      });

      const conversation = session.getOrCreateConversation(idConv);
      conversation.setParticipant(vendedor);
      conversation.setParticipant(comprador);
      conversation.setAttributes({subject: producto.nombre})

      const chatbox = session.createChatbox();
      chatbox.select(conversation);
      chatbox.mount(chatboxEl.current);

      return () => session.destroy();
    }
  }, [talkLoaded]);

  return <div ref={chatboxEl} style={{width: '100%', height: '500px'}}/>;
}

/*
export default function Chat({}) {
  const chatboxEl = useRef();

  // wait for TalkJS to load
  const [talkLoaded, markTalkLoaded] = useState(false);

  useEffect(() => {
    Talk.ready.then(() => markTalkLoaded(true));

    if (talkLoaded) {
      const currentUser = new Talk.User({
        id: '2',
        name: 'Henry Mill',
        email: 'henrymill@example.com',
        photoUrl: 'henry.jpeg',
        welcomeMessage: 'Hello!',
        role: 'default',
      });

      const otherUser = new Talk.User({
        id: '1',
        name: 'Jessica Wells',
        email: 'jessicawells@example.com',
        photoUrl: 'jessica.jpeg',
        welcomeMessage: 'Hello!',
        role: 'default',
      });

      const session = new Talk.Session({
        appId: 'tvYAZZjb',
        me: currentUser,
      });

      const conversationId = Talk.oneOnOneId(currentUser, otherUser);
      const conversation = session.getOrCreateConversation(conversationId);
      conversation.setParticipant(currentUser);
      conversation.setParticipant(otherUser);

      const chatbox = session.createChatbox();
      chatbox.select(conversation);
      chatbox.mount(chatboxEl.current);

      return () => session.destroy();
    }
  }, [talkLoaded]);

  return <div ref={chatboxEl} style={{width: '100%', height: '500px'}}/>;
}
*/
