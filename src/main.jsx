import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Productos from './components/productos/paginaProductos.jsx'
import Usuario from './components/usuarios/paginaUsuarios.jsx'
import PaginaProducto from './components/productos/paginaProducto.jsx'
import UpdateProduct from './components/productos/updateProducto.jsx'
import PaginaPrincipal from './components/principal/Principal.jsx'
import Chats from './components/chats/paginaChats.jsx'
import Chat from './components/chats/Chat.jsx'
import Valorar from './components/usuarios/paginaValorar.jsx'
import Pujas from './components/pujas/paginaPujas.jsx'
import App from './App.jsx'
import './assets/css/index.css'
import Checkout from './components/paypal/Checkout.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google';
import UploadProduct from './components/productos/upload_producto.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <PaginaPrincipal />
  },
  {
    path: '/productos',
    element: <Productos />
  },
  {
    path: '/misProductos',
    element: <Productos misProductos={true}/>
  },
  {
    path: '/checkout',
    element: <Checkout />
  },
  {
    path: '/producto/:id',
    element: <PaginaProducto />
  },
  {
    path: '/chats',
    element: <Chats />
  },
  {
    path: '/chat',
    element: <Chat />
  },
  {
    path: '/usuario/:correo',
    element: <Usuario />
  },
  {
    path: '/upload_product/',
    element: <UploadProduct/>
  },
  {
    path: '/valorar/:idProducto/:usuarioValorador/:usuarioValorado',
    element: <Valorar/>
  },
  {
    path: '/misPujas',
    element: <Pujas/>
  },
  {
    path: '/updateProducto/:idProducto',
    element: <UploadProduct/>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="755104758477-ftim848a1unjm8a85sge1h7jts0qb4ec.apps.googleusercontent.com">
      <RouterProvider router={router} />
      {/*<App />*/}
    </GoogleOAuthProvider>
  </React.StrictMode>,
)
