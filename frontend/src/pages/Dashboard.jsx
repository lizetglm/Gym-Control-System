import { useEffect, useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area,
} from 'recharts';
import { Users, ShoppingCart, Activity, TrendingUp } from 'lucide-react';
import { getDashboard } from '../services/api';
import '../styles/Dashboard.css';
import '../styles/Index.css';

const TOOLTIP_STYLE = {
  backgroundColor: '#2A2A2A',
  border: '1px solid #404040',
  borderRadius: '8px',
  color: '#fff',
  fontSize: '0.85rem',
  padding: '10px 14px',
};

const makeTooltip = (valueLabel) => ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={TOOLTIP_STYLE}>
      <p style={{ color: '#B0B0B0', marginBottom: 4 }}>{label}</p>
      <p style={{ color: '#52D4A8', fontWeight: 700 }}>
        {valueLabel}: {payload[0].value}
      </p>
    </div>
  );
};

const KPI_META = [
  { key: 'total_socios',   label: 'Total Socios',     Icon: Users,        color: '#52D4A8', format: (v) => v },
  { key: 'ventas_mes',     label: 'Ventas del Mes',   Icon: ShoppingCart, color: '#3498DB', format: (v) => v },
  { key: 'clases_activas', label: 'Clases Activas',   Icon: Activity,     color: '#F39C12', format: (v) => v },
  { key: 'ingresos_mes',   label: 'Ingresos del Mes', Icon: TrendingUp,   color: '#9B59B6',
    format: (v) => `$${Number(v).toLocaleString('es-MX', { minimumFractionDigits: 2 })}` },
];

function Dashboard() {
  const [data,    setData]    = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error,   setError]   = useState(null);

  useEffect(() => {
    getDashboard()
      .then(setData)
      .catch(() => setError('No se pudieron cargar los datos del dashboard.'))
      .finally(() => setCargando(false));
  }, []);

  if (cargando) {
    return (
      <div id="contendor">
        <header><h1>Dashboard</h1></header>
        <p style={{ color: '#B0B0B0', padding: '2rem' }}>Cargando estadísticas…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div id="contendor">
        <header><h1>Dashboard</h1></header>
        <p style={{ color: '#E74C3C', padding: '2rem' }}>{error}</p>
      </div>
    );
  }

  const { kpis, productos_mas_vendidos, clases_mas_alumnos, socios_por_mes } = data;

  return (
    <div id="contendor">
      <header>
        <h1>Dashboard</h1>
      </header>

      <div className="dashboard-kpis">
        {KPI_META.map(({ key, label, Icon, color, format }) => (
          <div className="kpi-card" key={key}>
            <div className="kpi-icon" style={{ background: `${color}22`, color }}>
              <Icon size={22} />
            </div>
            <div>
              <p className="kpi-value">{format(kpis[key])}</p>
              <p className="kpi-label">{label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-charts-row">
        <div className="chart-card">
          <h3 className="chart-title">Productos más vendidos</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart
              data={productos_mas_vendidos}
              margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#404040" vertical={false} />
              <XAxis
                dataKey="nombre"
                tick={{ fill: '#B0B0B0', fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: '#B0B0B0', fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                content={makeTooltip('Ventas')}
                cursor={{ fill: 'rgba(255,255,255,0.05)' }}
              />
              <Bar dataKey="ventas" fill="#52D4A8" radius={[6, 6, 0, 0]} maxBarSize={48} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3 className="chart-title">Clases con más alumnos</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart
              data={clases_mas_alumnos}
              layout="vertical"
              margin={{ top: 10, right: 20, left: 10, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#404040" horizontal={false} />
              <XAxis
                type="number"
                tick={{ fill: '#B0B0B0', fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                dataKey="clase"
                type="category"
                tick={{ fill: '#B0B0B0', fontSize: 12 }}
                axisLine={false}
                tickLine={false}
                width={65}
              />
              <Tooltip
                content={makeTooltip('Alumnos')}
                cursor={{ fill: 'rgba(255,255,255,0.05)' }}
              />
              <Bar dataKey="alumnos" fill="#3498DB" radius={[0, 6, 6, 0]} maxBarSize={28} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="chart-card">
        <h3 className="chart-title">Socios inscritos por mes ({new Date().getFullYear()})</h3>
        <ResponsiveContainer width="100%" height={240}>
          <AreaChart
            data={socios_por_mes}
            margin={{ top: 10, right: 20, left: -10, bottom: 0 }}
          >
            <defs>
              <linearGradient id="gradSocios" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#52D4A8" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#52D4A8" stopOpacity={0}   />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#404040" vertical={false} />
            <XAxis
              dataKey="mes"
              tick={{ fill: '#B0B0B0', fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: '#B0B0B0', fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={makeTooltip('Socios')} />
            <Area
              type="monotone"
              dataKey="socios"
              stroke="#52D4A8"
              strokeWidth={2.5}
              fill="url(#gradSocios)"
              dot={{ fill: '#52D4A8', r: 4, strokeWidth: 0 }}
              activeDot={{ r: 6, fill: '#52D4A8', strokeWidth: 0 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Dashboard;
