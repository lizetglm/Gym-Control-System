import { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import '../styles/RootLayout.css';
import '../styles/Index.css'
import '@fortawesome/fontawesome-free/css/all.min.css';

function RootLayout() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setMenuOpen(false);
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
              <li><Link to="/" onClick={closeMenu}><i className="fas fa-home"></i><span> Inicio</span></Link></li>
              <li><Link to="/dashboard" onClick={closeMenu}><i className="fa-solid fa-chart-line"></i><span> Dashboard</span></Link></li>
              <li><Link to="/socios" onClick={closeMenu}><i className="fa-solid fa-handshake"></i><span> Socios</span></Link></li>
              <li><Link to="/clases" onClick={closeMenu}><i className="fa-solid fa-calendar"></i><span> Clases</span></Link></li>
              <li><Link to="/ventas" onClick={closeMenu}><i className="fa-solid fa-cart-shopping"></i><span> Ventas</span></Link></li>
            </ul>
        </nav>

      <main>
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;