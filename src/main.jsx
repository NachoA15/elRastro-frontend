import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Productos from './components/productos/paginaProductos.jsx'
import App from './App.jsx'
import './assets/css/index.css'

const router = createBrowserRouter([
  {
    path: '/productos',
    element: <Productos />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    {/*<App />*/}
  </React.StrictMode>,
)
