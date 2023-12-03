import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './assets/css/App.css'
import { PayPalScriptProvider } from '@paypal/react-paypal-js';


function App() {
  const [count, setCount] = useState(0)
  const initialOptions = {
    "client-id": "AZte9y79PwgBayOc9EegAbG0E_fCwok3erAYKlaMGynqXlUaOo_gbHLvhPH7SceELnW1bUK6Lv6G8RhI",
    currency: "EUR",
    intent: "capture"
}

  return (
    <>
    <PayPalScriptProvider options={initialOptions}>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </PayPalScriptProvider>
    </>
  )
}

export default App
