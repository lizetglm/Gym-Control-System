import { Outlet, Link, NavLink } from 'react-router-dom';
import '../styles/RootLayout.css';
import '../styles/Index.css'
import '@fortawesome/fontawesome-free/css/all.min.css';

function RootLayout() {
  return (
    <>
        <div id="menu-sm">
            <button id="btn-menu" className="menu-toggle">
                <i className="fas fa-bars"></i>
            </button>
            <h2>GYMMINT</h2>
        </div>

        <nav className="sidebar">
            <h2>GYMMINT</h2>
            <ul>
                <li><Link to="/"><i className="fas fa-home"></i><span> Inicio</span></Link></li>
                <li><Link to="/socios"><i class="fa-solid fa-handshake"></i><span> Socios</span></Link></li>
                <li><Link to="/clases"><i className="fa-solid fa-calendar"></i><span> Clases</span></Link></li>
                <li><Link to="/caja"><i className="fa-solid fa-piggy-bank"></i><span> Caja</span></Link></li>
                <li><Link to="/ventas"><i className="fa-solid fa-cart-shopping"></i><span> Ventas</span></Link></li>
            </ul>
        </nav>

      <main>
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;