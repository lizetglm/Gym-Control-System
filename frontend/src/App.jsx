import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import RootLayout from './layouts/RootLayout';
import Socios from './pages/Socios';
import Caja from './pages/Caja';
import Ventas from './pages/Ventas';
import Clases from './pages/Clases';

function App() {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />} >
        <Route index element={<Home />} />
        <Route path="socios" element={<Socios />} />
        <Route path="clases" element={<Clases />} />
        <Route path="caja" element={<Caja />} />
        <Route path="ventas" element={<Ventas />} />

      </Route>
    </Routes>
  )
}

export default App
