 
import './App.css';
import React from 'react';
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Routes,
  UseNavigate,
  Link,
} from "react-router-dom";
import Home from './Container/Home';
import Login from './Components/Login';

function App() {
  return (
  
    
  <Routes>
    <Route path= '/login' element={<Login/>} /> 
    <Route path= '/*' element={<Home/>} /> 
  </Routes>
  
  );
}

export default App;
