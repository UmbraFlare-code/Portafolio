import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {App} from './App.jsx'

import './styles/global.css'
import './styles/home.css';
import './styles/proyects.css';
import "./styles/footer.css";
import './styles/contact.css';
import "./styles/about.css";


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
