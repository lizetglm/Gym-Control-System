import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area,
} from 'recharts';
import { Users, ShoppingCart, Activity, TrendingUp } from 'lucide-react';
import '../styles/Dashboard.css';
import '../styles/Index.css';

const PRODUCTOS_VENDIDOS = [
  { nombre: 'WheyGold',  ventas: 45 },
  { nombre: 'Creatina',  ventas: 32 },
  { nombre: 'Shaker',    ventas: 28 },
  { nombre: 'Guantes',   ventas: 21 },
  { nombre: 'Botella',   ventas: 18 },
  { nombre: 'Barra',     ventas: 15 },
];

const CLASES_ALUMNOS = [
  { clase: 'Spinning', alumnos: 24 },
  { clase: 'Yoga',     alumnos: 19 },
  { clase: 'CrossFit', alumnos: 16 },
  { clase: 'Pilates',  alumnos: 14 },
  { clase: 'Zumba',    alumnos: 12 },
];

const SOCIOS_POR_MES = [
  { mes: 'Ene', socios: 12 },
  { mes: 'Feb', socios: 19 },
  { mes: 'Mar', socios: 8  },
  { mes: 'Abr', socios: 25 },
  { mes: 'May', socios: 17 },
  { mes: 'Jun', socios: 22 },
  { mes: 'Jul', socios: 30 },
  { mes: 'Ago', socios: 28 },
  { mes: 'Sep', socios: 15 },
  { mes: 'Oct', socios: 20 },
  { mes: 'Nov', socios: 18 },
  { mes: 'Dic', socios: 24 },
];

const KPIs = [
  { label: 'Total Socios',    value: '148',     Icon: Users,        color: '#52D4A8' },
  { label: 'Ventas del Mes',  value: '87',      Icon: ShoppingCart, color: '#3498DB' },
  { label: 'Clases Activas',  value: '12',      Icon: Activity,     color: '#F39C12' },
  { label: 'Ingresos del Mes',value: '$42,350', Icon: TrendingUp,   color: '#9B59B6' },
];

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

function Dashboard() {
  return (
    <div id="contendor">
      <header>
        <h1>Dashboard</h1>
      </header>

      <div className="dashboard-kpis">
        {KPIs.map(({ label, value, Icon, color }) => (
          <div className="kpi-card" key={label}>
            <div className="kpi-icon" style={{ background: `${color}22`, color }}>
              <Icon size={22} />
            </div>
            <div>
              <p className="kpi-value">{value}</p>
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
              data={PRODUCTOS_VENDIDOS}
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
              data={CLASES_ALUMNOS}
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
        <h3 className="chart-title">Socios inscritos por mes</h3>
        <ResponsiveContainer width="100%" height={240}>
          <AreaChart
            data={SOCIOS_POR_MES}
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
