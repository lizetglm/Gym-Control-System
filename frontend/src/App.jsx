import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import RootLayout from './layouts/RootLayout';
import Socios from './pages/Socios';
import Caja from './pages/Caja';
import Ventas from './pages/Ventas';
import Clases from './pages/Clases';
import Dashboard from './pages/Dashboard';
import { LogIn } from 'lucide-react';
import Login from './pages/Login';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<RootLayout />} >
        <Route index element={<Home />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="socios" element={<Socios />} />
        <Route path="clases" element={<Clases />} />
        <Route path="caja" element={<Caja />} />
        <Route path="ventas" element={<Ventas />} />
      </Route>
    </Routes>
  )
}

export default App
