import React from 'react'
import '../styles/Ventas.css';
import '../styles/Index.css';

function Ventas() {
  return (
    <div id="contendor">
        <header>
            <h1>Tienda</h1>
        </header>

        <div id="contenedor-a">
            <div id="contenedor-productos">
                <h3>Productos Disponibles</h3>
                <div id="productos">
                    <div className="card-producto">
                        <h4 className="nombre-producto">Proteína WheyGold</h4>
                        <p className="precio">$450.00</p>
                        <button className="btn-agregar">+ Agregar</button>
                    </div>
                    <div className="card-producto">
                        <h4 className="nombre-producto">Creatina 300g</h4>
                        <p className="precio">$280.00</p>
                        <button className="btn-agregar">+ Agregar</button>
                    </div>
                    <div className="card-producto">
                        <h4 className="nombre-producto">Shaker Premium</h4>
                        <p className="precio">$120.00</p>
                        <button className="btn-agregar">+ Agregar</button>
                    </div>
                    <div className="card-producto">
                        <h4 className="nombre-producto">Toalla Deportiva</h4>
                        <p className="precio">$80.00</p>
                        <button className="btn-agregar">+ Agregar</button>
                    </div>
                    <div className="card-producto">
                        <h4 className="nombre-producto">Guantes Gym</h4>
                        <p className="precio">$150.00</p>
                        <button className="btn-agregar">+ Agregar</button>
                    </div>
                    <div className="card-producto">
                        <h4 className="nombre-producto">Botella de Agua</h4>
                        <p className="precio">$65.00</p>
                        <button className="btn-agregar">+ Agregar</button>
                    </div>
                </div>
            </div>

            <div id="contenedor-ticket">
                <h3>Ticket de Venta</h3>
                <div id="lista-ticket">
                    <p className="ticket-vacio">No hay productos agregados</p>
        
                </div>
                <div id="ticket-totales">
                    <div className="ticket-fila">
                        <span>Subtotal:</span>
                        <span id="subtotal">$0.00</span>
                    </div>
                    <div className="ticket-fila">
                        <span>IVA (16%):</span>
                        <span id="iva">$0.00</span>
                    </div>
                    <div className="ticket-separador"></div>
                    <div className="ticket-fila ticket-total">
                        <span>Total:</span>
                        <span id="total">$0.00</span>
                    </div>
                </div>
                <button id="btn-realizar-venta">Realizar Venta</button>
            </div>
        </div>
    </div>
  )
}

export default Ventas