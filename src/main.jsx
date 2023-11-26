import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Productos from './components/productos/paginaProductos.jsx'
import PaginaPrincipal from './components/principal/Principal.jsx'
import Chats from './components/chats/paginaChats.jsx'
import App from './App.jsx'
import './assets/css/index.css'

const router = createBrowserRouter([
  {
    path: '/productos',
    element: <Productos />
  },
  {
    path: '/productos/:usuario',
    element: <Productos />
  },
  {
    path: '/',
    element: <PaginaPrincipal /> 
    path: '/chats',
    element: <Chats />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    {/*<App />*/}
  </React.StrictMode>,
)
