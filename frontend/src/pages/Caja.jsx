import React from 'react'
import '../styles/Caja.css';
import '../styles/Index.css';

function Caja() {
  return (
    <div id="contendor">
        <header>
            <div class="header-content">
                <h1>Gestión de Caja</h1>
                <button id="btn-nuevo-movimiento">+ Nuevo Movimiento</button>
            </div>
        </header>

        <div id="cards-resumen">
            <div class="card-resumen card-ingresos">
                <span class="card-label">Ingresos del Día</span>
                <p class="card-monto">$2,450.00</p>
            </div>
            <div class="card-resumen card-egresos">
                <span class="card-label">Egresos del Día</span>
                <p class="card-monto egreso">$350.00</p>
            </div>
            <div class="card-resumen card-total">
                <span class="card-label">Total en Caja</span>
                <p class="card-monto total">$2,100.00</p>
            </div>
        </div>

        <div id="contenedor-movimientos">
            <h3>Últimos Movimientos</h3>
            <table id="tabla-movimientos">
                <thead>
                    <tr>
                        <th>HORA</th>
                        <th>TIPO</th>
                        <th>CONCEPTO</th>
                        <th>MONTO</th>
                        <th>RESPONSABLE</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>14:30</td>
                        <td><span class="badge badge-ingreso">INGRESO</span></td>
                        <td>Membresía Premium</td>
                        <td class="monto-positivo">+$800.00</td>
                        <td>Luis Rodríguez</td>
                    </tr>
                    <tr>
                        <td>13:15</td>
                        <td><span class="badge badge-egreso">EGRESO</span></td>
                        <td>Compra de Suplementos</td>
                        <td class="monto-negativo">-$350.00</td>
                        <td>Administrador</td>
                    </tr>
                    <tr>
                        <td>10:00</td>
                        <td><span class="badge badge-ingreso">INGRESO</span></td>
                        <td>Renovación Membresía</td>
                        <td class="monto-positivo">+$500.00</td>
                        <td>Ana Martínez</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default Caja