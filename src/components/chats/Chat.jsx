import Talk from 'talkjs';
import { useEffect, useState, useRef } from 'react';
import {useLocation} from 'react-router-dom'
import productoService from '../../service/productoService';
import NavBar from '../NavBar';
import '../../assets/css/chat.css'

export default function Chat() {
  const chatboxEl = useRef();

  const [talkLoaded, markTalkLoaded] = useState(false);
  const [producto, setProducto] = useState();
  const [idConv, setIdConv] = useState("");

  const location = useLocation();
  const parametros = new URLSearchParams(location.search);
  const parametroCifrado = parametros.get('id');

  useEffect(() => {
    Talk.ready.then(() => markTalkLoaded(true));
  }, [])

  useEffect(() => {
    const idProd = decodeURIComponent(parametroCifrado.split("_")[0]);
    const correoVend = decodeURIComponent(parametroCifrado.split("_")[1]);
    const correoComp = decodeURIComponent(parametroCifrado.split("_")[2]);
    setIdConv(idProd + "_" + correoVend + "_" + correoComp);
  }, [parametroCifrado]);

  const usuario = localStorage.getItem("email");
  if(usuario === ""){
    window.location.href = "/"
  }

  useEffect(() => {
    if(idConv){
      const fetchProducto = async () => { 
        try{
          let idProd = idConv.split("_")[0];
          productoService.getProductoById(setProducto, idProd);
        }catch(error){
          console.log("Error al coger el producto: ", error);
        }
      }
      fetchProducto();
    }
  }, [idConv]);
    

  useEffect(() => {

    if (talkLoaded && producto && idConv) {
      let correoVend = idConv.split("_")[1];
      let correoComp = idConv.split("_")[2];
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
          appId: `${import.meta.env.VITE_CHAT_REACT_APP_ID}`,
          me: vendedor,
        });
      }else{
        session = new Talk.Session({
          appId: `${import.meta.env.VITE_CHAT_REACT_APP_ID}`,
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
  }, [talkLoaded, producto, idConv]);

  return (
    <>
    <NavBar ubicacion={'Mis chats'}/>

    <div className="container-fluid chat-div d-flex flex-column vh-100">
      <div className='row chat-row flex-grow-1'>
        <div className="col-md-12 d-flex align-items-center">
        <div id='chat' ref={chatboxEl} className="flex-grow-1 mb-4"/>
        </div>
      </div>
      <div className='row col-12'>
        <div className="col-md-6">
          <button
            className="btn-chat"
            onClick={() => {
              window.location.href = "/chats";
            }}
          >Volver</button>
        </div>
      </div>
    </div>
    
    </>
  )
}
