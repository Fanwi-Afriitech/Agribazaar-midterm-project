import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from "react-router-dom"

//code to initialize the application by rendering the App component into the root DOM element

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
       <App />
  
  
  </BrowserRouter>
    
)
