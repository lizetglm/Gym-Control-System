import './App.css'
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import RootLayout from './layouts/RootLayout';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Socios from './pages/Socios';
import Clases from './pages/Clases';
import Caja from './pages/Caja';
import Ventas from './pages/Ventas';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />

        {/* Todas las rutas internas requieren autenticación */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<RootLayout />}>
            <Route index element={<Home />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="socios" element={<Socios />} />
            <Route path="clases" element={<Clases />} />
            <Route path="caja" element={<Caja />} />
            <Route path="ventas" element={<Ventas />} />
          </Route>
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
