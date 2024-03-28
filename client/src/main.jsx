import React from 'react'
import ReactDOM from 'react-dom'
import App from './App.jsx'
import './index.css'
import Header from './components/Header.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Header />
    <main>
      <App />
    </main>
  </React.StrictMode>,
)
