import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App.jsx'
import AuthProvider from './context/AuthContext.jsx';
import { BrowserRouter as Router } from 'react-router-dom';
createRoot(document.getElementById('root')).render(
  
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>,
)
