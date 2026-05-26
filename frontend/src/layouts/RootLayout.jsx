import { useState } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import '../styles/RootLayout.css';
import '../styles/Index.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

function RootLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu  = () => setMenuOpen(false);

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <>
      <div id="menu-sm">
        <button id="btn-menu" className="menu-toggle" onClick={toggleMenu}>
          <i className="fas fa-bars"></i>
        </button>
        <h2>GYMMINT</h2>
      </div>

      <nav className={`sidebar ${menuOpen ? 'active' : ''}`}>
        <h2>GYMMINT</h2>
        <ul>
          <li><Link to="/"          onClick={closeMenu}><i className="fas fa-home"></i><span> Inicio</span></Link></li>
          <li><Link to="/dashboard" onClick={closeMenu}><i className="fa-solid fa-chart-line"></i><span> Dashboard</span></Link></li>
          <li><Link to="/socios"    onClick={closeMenu}><i className="fa-solid fa-handshake"></i><span> Socios</span></Link></li>
          <li><Link to="/clases"    onClick={closeMenu}><i className="fa-solid fa-calendar"></i><span> Clases</span></Link></li>
          <li><Link to="/ventas"    onClick={closeMenu}><i className="fa-solid fa-cart-shopping"></i><span> Ventas</span></Link></li>
        </ul>

        <div className="sidebar-footer">
          {user && (
            <span className="sidebar-user">{user.nombre}</span>
          )}
          <button className="logout-btn" onClick={handleLogout}>
            <LogOut size={16} /> Cerrar sesión
          </button>
        </div>
      </nav>

      <main>
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
