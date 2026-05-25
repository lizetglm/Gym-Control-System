import React from 'react'
import '../styles/Home.css'
import gymFoto from '../assets/gym2.jpg'

const tickerItems = [
    'GYMMINT', 'Gestión de Socios', 'Clases · Caja · Ventas', 'Entrenadores', 'Panel de Control',
    'GYMMINT', 'Gestión de Socios', 'Clases · Caja · Ventas', 'Entrenadores', 'Panel de Control',
]

function Home() {
    return (
        <div id="contendor" className="home-page">
            <div className="banner-gym">

                {/* Cinta superior */}
                <div className="cinta-superior">
                    Sistema de Gestión Deportiva · GYMMINT
                </div>

                {/* Portada principal */}
                <div className="portada">

                    {/* Fondo oscuro */}
                    <div className="zona-centro"></div>

                    {/* Panel verde izquierdo */}
                    <div className="zona-izquierda"></div>

                    {/* Imagen derecha */}
                    <div className="zona-derecha">
                        <img src={gymFoto} alt="Miembros del gimnasio" />
                    </div>

                    {/* Logo */}
                    <div className="area-logo">
                        <div className="icono-logo">
                            <i className="fa-solid fa-dumbbell"></i>
                        </div>
                        <div className="etiqueta-logo">GYMMINT</div>
                        <div className="subtexto-logo">Gestión Deportiva</div>
                    </div>

                    {/* Texto central con estadísticas */}
                    <div className="area-texto">
                        <div className="antetitulo">Bienvenido al Panel de Control</div>
                        <div className="titulo-principal">
                            Tu Gym,<span>Tu Equipo</span>
                        </div>
                        <div className="eslogan">Socios · Entrenadores · Clases · Ventas</div>
                        <div className="fila-estadisticas">
                            <div className="caja-estadistica">
                                <div className="num-estadistica">24</div>
                                <div className="etiqueta-estadistica">Socios hoy</div>
                            </div>
                            <div className="caja-estadistica">
                                <div className="num-estadistica">3</div>
                                <div className="etiqueta-estadistica">Clases</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Ticker / marquee */}
                <div className="envoltura-carrusel">
                    <div className="interior-carrusel">
                        {tickerItems.map((item, i) => (
                            <div key={i} className="item-carrusel">
                                {item}<span className="punto-separador"></span>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Home
