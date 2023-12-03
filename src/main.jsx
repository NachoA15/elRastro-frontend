import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Productos from './components/productos/paginaProductos.jsx'
import PaginaPrincipal from './components/principal/Principal.jsx'
import Chats from './components/chats/paginaChats.jsx'
import App from './App.jsx'
import './assets/css/index.css'
import Checkout from './components/paypal/Checkout.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google';

const router = createBrowserRouter([
  {
    path: '/productos',
    element: <Productos />
  },
  {
    path: '/checkout',
    element: <Checkout />
  },
  {
    path: '/productos/:usuario',
    element: <Productos />
  },
  {
    path: '/',
    element: <PaginaPrincipal /> 
  },
  {
    path: '/chats',
    element: <Chats />
  },
  {
    path: '/chat/:idConv'
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="755104758477-ftim848a1unjm8a85sge1h7jts0qb4ec.apps.googleusercontent.com">
      <RouterProvider router={router} />
      {/*<App />*/}
    </GoogleOAuthProvider>;
  </React.StrictMode>,
)
