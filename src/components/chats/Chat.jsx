import Talk from 'talkjs';
import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router';
import productoService from '../../service/productoService';
import NavBar from '../NavBar';

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
    const fetchProducto = async () => { 
      try{
        productoService.getProductoById(setProducto, idProd);
        setProductoFetched(true);
      }catch(error){
        console.log("Error al coger el producto: ", error);
      }
    }
    fetchProducto();
  }, [idProd]);

  useEffect(() => {

    if (talkLoaded && productoFetched && producto) {
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
      conversation.setAttributes({subject: producto.nombre, photoUrl: producto.imagen})

      const chatbox = session.createChatbox();
      chatbox.select(conversation);
      chatbox.mount(chatboxEl.current);

      return () => {
        session.destroy();
      }
    }
  }, [talkLoaded, productoFetched, producto]);

  useEffect(() => {
    Talk.ready.then(() => markTalkLoaded(true));
  }, [])

  return (
    <>
    <NavBar ubicacion={'Mis chats'}/>
    <div ref={chatboxEl} style={{height: '900px', width: '700px', margin: '0px'}}/>
    </>
  )
}
