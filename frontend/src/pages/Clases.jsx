import { useMemo, useState, useEffect } from 'react';
import { Search, UserPlus, UserMinus } from 'lucide-react';
import GestionInscripcionDialog from '../components/GestionInscripcionDialog';
import ModalInfoTable from '../components/ModalInfoTable';
import '../styles/Index.css';
import '../styles/Clases.css';

const API = 'http://127.0.0.1:8000/api';

function Clases() {
  const [clases, setClases]               = useState([]);
  const [socios, setSocios]               = useState([]);
  const [inscripciones, setInscripciones] = useState([]);
  const [selectedClase, setSelectedClase] = useState(null);

  const [searchClase, setSearchClase]   = useState('');
  const [estadoFiltro, setEstadoFiltro] = useState('Todas');

  const [gestionModalOpen, setGestionModalOpen] = useState(false);
  const [gestionModalMode, setGestionModalMode] = useState('create');
  const [infoClaseOpen, setInfoClaseOpen]       = useState(false);

  // ── Carga de datos desde el API ──────────────────────────────
  const cargarClases = () => {
    fetch(`${API}/clases/horarios/`)
      .then(res => res.json())
      .then(setClases)
      .catch(console.error);
  };

  const cargarSocios = () => {
    fetch(`${API}/socios/perfiles/`)
      .then(res => res.json())
      .then(setSocios)
      .catch(console.error);
  };

  const cargarInscripciones = () => {
    fetch(`${API}/clases/inscripciones/`)
      .then(res => res.json())
      .then(setInscripciones)
      .catch(console.error);
  };

  useEffect(() => {
    cargarClases();
    cargarSocios();
    cargarInscripciones();
  }, []);

  // ── Helpers ──────────────────────────────────────────────────
  // "clase" en el API es el id de la clase (campo `clase` del serializer)
  const getInscritosCount = (claseId) =>
    inscripciones.filter(i => i.clase === claseId).length;

  const closeGestionModal = () => {
    setGestionModalOpen(false);
    setSelectedClase(null);
  };

  const openInscribirSocio = (clase) => {
    setInfoClaseOpen(false);
    setSelectedClase(clase);
    setGestionModalMode('create');
    setGestionModalOpen(true);
  };

  const openEliminarSocio = (clase) => {
    setInfoClaseOpen(false);
    setSelectedClase(clase);
    setGestionModalMode('delete');
    setGestionModalOpen(true);
  };

  const handleInfoClase = (clase) => {
    setSelectedClase(clase);
    setInfoClaseOpen(true);
  };

  // ── Inscribir socio → POST al API ────────────────────────────
  const handleGuardarInscripcion = ({ claseId, socioId }) => {
    fetch(`${API}/clases/inscripciones/`, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ socio: Number(socioId), clase: Number(claseId) }),
    })
      .then(res => {
        if (!res.ok) return res.json().then(e => { throw e; });
        cargarInscripciones();
        cargarClases();
      })
      .catch(console.error)
      .finally(closeGestionModal);
  };

  // ── Eliminar inscripción → DELETE al API ─────────────────────
  const handleEliminarInscripcion = (inscripcionId) => {
    fetch(`${API}/clases/inscripciones/${inscripcionId}/`, { method: 'DELETE' })
      .then(() => {
        cargarInscripciones();
        cargarClases();
      })
      .catch(console.error)
      .finally(closeGestionModal);
  };

  // ── Filtrado ─────────────────────────────────────────────────
  const clasesFiltradas = useMemo(() =>
    clases.filter(clase => {
      const byEstado = estadoFiltro === 'Todas' || clase.estado === estadoFiltro;
      const term     = searchClase.trim().toLowerCase();
      const byTerm   =
        !term ||
        clase.nombre.toLowerCase().includes(term) ||
        clase.instructor?.toLowerCase().includes(term) ||
        clase.horario?.toLowerCase().includes(term);
      return byEstado && byTerm;
    }),
    [clases, estadoFiltro, searchClase]
  );

  const inscripcionesRecientes = useMemo(() => inscripciones.slice(0, 6), [inscripciones]);

  const inscripcionesClaseSeleccionada = useMemo(() => {
    if (!selectedClase) return [];
    return inscripciones.filter(i => i.clase === selectedClase.id);
  }, [inscripciones, selectedClase]);

  // ── Modal de detalles ────────────────────────────────────────
  const estadoLabel = (e) =>
    e === 'activa' ? 'Activa' : e === 'inactiva' ? 'Inactiva' : 'Cancelada';

  const modalFields = [
    { label: 'ID Clase',           key: 'id' },
    { label: 'Nombre de Clase',    key: 'nombre' },
    { label: 'Instructor/a',       key: 'instructor' },
    { label: 'Horario programado', key: 'horario' },
    { label: 'Cupo Límite',        key: 'cupo' },
    { label: 'Total Inscritos',    value: (c) => `${getInscritosCount(c.id)} / ${c.cupo} alumnos` },
    { label: 'Estado',             value: (c) => estadoLabel(c.estado) },
  ];

  const modalActions = [
    {
      id: 'info-inscribir', label: 'Inscribir Socio',
      icon: <UserPlus size={18} />, variant: 'primary',
      onClick: openInscribirSocio,
    },
    {
      id: 'info-remover', label: 'Remover socio',
      icon: <UserMinus size={18} />, variant: 'danger',
      onClick: openEliminarSocio,
    },
  ];

  return (
    <div id="contendor">
      <header>
        <h1>Gestión de Clases</h1>
      </header>

      <section className="controls clasesControls">
        <div className="clasesSearchWrap">
          <input
            className="searchInput"
            placeholder="Buscar por clase, instructor u horario"
            value={searchClase}
            onChange={e => setSearchClase(e.target.value)}
          />
          <Search size={18} className="clasesSearchIcon" />
        </div>

        <select
          className="filterSelect"
          value={estadoFiltro}
          onChange={e => setEstadoFiltro(e.target.value)}
        >
          <option value="Todas">Todas</option>
          <option value="activa">Activas</option>
          <option value="inactiva">Inactivas</option>
          <option value="cancelada">Canceladas</option>
        </select>
      </section>

      <div className="tableContainer clasesTableContainer">
        <table className="sociosTable clasesTable">
          <thead>
            <tr>
              <th>Clase</th>
              <th>Instructor</th>
              <th>Horario</th>
              <th>Cupo</th>
              <th>Inscritos</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {clasesFiltradas.length === 0 ? (
              <tr>
                <td colSpan={7} style={{ textAlign: 'center', color: '#B0B0B0', padding: '24px' }}>
                  No se encontraron clases
                </td>
              </tr>
            ) : (
              clasesFiltradas.map(clase => (
                <tr key={clase.id} onClick={() => handleInfoClase(clase)} style={{ cursor: 'pointer' }}>
                  <td data-label="Clase">{clase.nombre}</td>
                  <td data-label="Instructor">{clase.instructor}</td>
                  <td data-label="Horario">{clase.horario}</td>
                  <td data-label="Cupo">{clase.cupo}</td>
                  <td data-label="Inscritos">{getInscritosCount(clase.id)}</td>
                  <td data-label="Estado">
                    <span className={`estado ${clase.estado === 'activa' ? 'activo' : 'inactivo'}`}>
                      {estadoLabel(clase.estado)}
                    </span>
                  </td>
                  <td data-label="Acciones">
                    <div className="accionesCell">
                      <button
                        style={{ background: 'none', border: 'none', color: 'var(--mint-primary)', cursor: 'pointer' }}
                        onClick={e => { e.stopPropagation(); openInscribirSocio(clase); }}
                        title="Inscribir socio"
                      >
                        <UserPlus size={16} />
                      </button>
                      <button
                        style={{ background: 'none', border: 'none', color: '#E74C3C', cursor: 'pointer' }}
                        onClick={e => { e.stopPropagation(); openEliminarSocio(clase); }}
                        title="Remover socio"
                      >
                        <UserMinus size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <section className="clasesResumenPanel">
        <h3>Inscripciones recientes</h3>
        {inscripcionesRecientes.length === 0 ? (
          <p className="clasesEmpty">Aún no hay inscripciones registradas.</p>
        ) : (
          <div className="clasesChipGrid">
            {inscripcionesRecientes.map(inscripcion => (
              <article key={inscripcion.id} className="claseChip">
                <p className="chipTitle">{inscripcion.socioNombre}</p>
                <p style={{ color: 'var(--mint-primary)', fontWeight: 500 }}>
                  {inscripcion.claseNombre}
                </p>
                <p style={{ color: '#B0B0B0', fontSize: '11px', marginTop: '4px' }}>
                  Inscrito el: {inscripcion.fecha_inscripcion?.slice(0, 10)}
                </p>
              </article>
            ))}
          </div>
        )}
      </section>

      <ModalInfoTable
        open={infoClaseOpen}
        title="Detalles de la Clase"
        item={selectedClase}
        fields={modalFields}
        actions={modalActions}
        onClose={() => { setInfoClaseOpen(false); setSelectedClase(null); }}
      />

      <GestionInscripcionDialog
        open={gestionModalOpen}
        mode={gestionModalMode}
        clase={selectedClase}
        socios={socios}
        inscripcionesClase={inscripcionesClaseSeleccionada}
        onClose={closeGestionModal}
        onSubmit={handleGuardarInscripcion}
        onDelete={handleEliminarInscripcion}
      />
    </div>
  );
}

export default Clases;
