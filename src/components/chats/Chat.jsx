import Talk from 'talkjs';
import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router';
import productoService from '../../service/productoService';

export default function Chat() {
  const chatboxEl = useRef();

  const [talkLoaded, markTalkLoaded] = useState(false);
  const [producto, setProducto] = useState();
  const [productoFetched, setProductoFetched] = useState(false);

  const usuario = localStorage.getItem("usuario") || "";

  let params = useParams();
  let idConv = params.id;
  let idProd = idConv.split("_")[0];
  let correoVend = idConv.split("_")[1];
  let correoComp = idConv.split("_")[2];

  useEffect(() => {
    productoService.getProductoById((producto) => {
      console.log("Producto pillado");
      setProductoFetched(true);
    }, idProd);
  }, [idProd]);

  useEffect(() => {
    Talk.ready.then(() => markTalkLoaded(true));

    if (talkLoaded && productoFetched) {
      console.log(producto)
      const vendedor = new Talk.User({
        id: correoVend,
        name: "Vendedor " + producto.nombre
      });

      const comprador = new Talk.User({
        id: correoComp,
        name: "Comprador " + producto.nombre
      });

      let session;

      if(usuario === correoVend){
        session = new Talk.Session({
          appId: 'tvYAZZjb',
          me: vendedor,
        });
      }else{
        session = new Talk.Session({
          appId: 'tvYAZZjb',
          me: comprador,
        });
      }

      const conversation = session.getOrCreateConversation(idConv);
      conversation.setParticipant(vendedor);
      conversation.setParticipant(comprador);
      conversation.setAttributes({subject: producto.nombre})

      const chatbox = session.createChatbox();
      chatbox.select(conversation);
      chatbox.mount(chatboxEl.current);

      return () => {
        session.destroy();
      }
    }
  }, [talkLoaded]);

  return <div ref={chatboxEl} style={{width: '200%', height: '800px'}}/>;
}
