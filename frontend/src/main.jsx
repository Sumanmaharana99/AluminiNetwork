import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { SocketProvider } from './context/SocketContext.jsx'
import { Socket } from 'socket.io-client'
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <AuthProvider>
    <SocketProvider>
    <App />
    </SocketProvider>
  </AuthProvider>
  </BrowserRouter>,
)
