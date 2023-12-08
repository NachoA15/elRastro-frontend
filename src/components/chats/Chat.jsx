import Talk from 'talkjs';
import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router';
import productoService from '../../service/productoService';
import NavBar from '../NavBar';
import '../../assets/css/chat.css'

export default function Chat({idConv}) {
  const chatboxEl = useRef();

  const [talkLoaded, markTalkLoaded] = useState(false);
  const [producto, setProducto] = useState();
  const [productoFetched, setProductoFetched] = useState(false);

  useEffect(() => {

  }, [idConv]);

  const usuario = localStorage.dgetItem("usuario") || "";
  if(usuario === ""){
    window.location.href = "/"
  }

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

    if (talkLoaded && productoFetched && producto && usuario !== "") {
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

    <div className="container-fluid chat-div">
      <br/>
      <br/>
      <br/>
      <div className='row'>
        <div className="col-md-6">
          <button
            className="btn"
            onClick={() => {
              window.location.href = "/chats";
            }}
          >Volver</button>
        </div>
      </div>
      <div className='row' id="chat">
        <div className="col-md-12 d-flex justify-content-center align-items-center">
        <div ref={chatboxEl} style={{height: '900px', width: '700px', margin: '100px auto 0'}}/>
        </div>
      </div>
    </div>
    
    </>
  )
}
