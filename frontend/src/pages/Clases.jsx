import { useMemo, useState, useEffect } from 'react';
import { Search, UserPlus, UserMinus, Download, FileText } from 'lucide-react';
import { CSVLink } from 'react-csv';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import GestionInscripcionDialog from '../components/GestionInscripcionDialog';
import ModalInfoTable from '../components/ModalInfoTable';
import '../styles/Index.css';
import '../styles/Clases.css';

const API = 'http://127.0.0.1:8000/api';

function Clases() {
  const [clases, setClases]               = useState([]); //  lista de clases cargada del backend
  const [socios, setSocios]               = useState([]); //  lista de socios para inscribir (del backend)
  const [inscripciones, setInscripciones] = useState([]); // inscripciones (del backend).
  const [selectedClase, setSelectedClase] = useState(null); //clase seleccionada para ver detalles o inscribir.

  const [searchClase, setSearchClase]   = useState(''); // texto de búsqueda.
  const [estadoFiltro, setEstadoFiltro] = useState('Todas'); // filtro por estado (activa/inactiva/cancelada).

  const [gestionModalOpen, setGestionModalOpen] = useState(false); // abre/cierra el modal de inscripciones.
  const [gestionModalMode, setGestionModalMode] = useState('create'); // “create” o “delete” (inscribir vs remover).
  const [infoClaseOpen, setInfoClaseOpen]       = useState(false); // abre/cierra el modal de detalles.

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

  const csvData = useMemo(() => clasesFiltradas.map(c => ({
    Clase:      c.nombre,
    Instructor: c.instructor,
    Horario:    c.horario,
    Cupo:       c.cupo,
    Inscritos:  getInscritosCount(c.id),
    Estado:     c.estado,
  })), [clasesFiltradas, inscripciones]);

  const exportToPDF = () => {
    const doc = new jsPDF('landscape');
    const ancho = doc.internal.pageSize.getWidth();

    // Header
    doc.setFillColor(13, 13, 13);
    doc.rect(0, 0, ancho, 28, 'F');
    doc.setTextColor(82, 212, 168);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('GymMint', 14, 16);
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(12);
    doc.text('Reporte de Clases', ancho / 2, 16, { align: 'center' });
    doc.setTextColor(176, 176, 176);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    const fecha = new Date().toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' });
    doc.text(`Generado: ${fecha}`, ancho - 14, 16, { align: 'right' });
    doc.setFontSize(9);
    doc.text(`Total: ${clasesFiltradas.length} clases`, 14, 36);

    autoTable(doc, {
      startY: 42,
      head: [['Clase', 'Instructor', 'Horario', 'Cupo', 'Inscritos', 'Estado']],
      body: clasesFiltradas.map(c => [
        c.nombre,
        c.instructor,
        c.horario,
        c.cupo,
        getInscritosCount(c.id),
        c.estado,
      ]),
      headStyles: { fillColor: [82, 212, 168], textColor: [13, 13, 13], fontStyle: 'bold', fontSize: 9 },
      alternateRowStyles: { fillColor: [245, 245, 245] },
      styles: { fontSize: 8.5, cellPadding: 3 },
      margin: { left: 14, right: 14 },
    });

    doc.save(`clases_${new Date().toISOString().slice(0, 10)}.pdf`);
  };

  return (
    <div id="contendor">
      <header>
        <h1>Gestión de Clases</h1>
      </header>

      <div className="acciones">
        <CSVLink
          data={csvData}
          filename={`clases_${new Date().toISOString().slice(0, 10)}.csv`}
          className="acciones-csv-link"
        >
          <Download size={20} /> Exportar CSV
        </CSVLink>
        <button onClick={exportToPDF}>
          <FileText size={20} /> Exportar PDF
        </button>
      </div>

      {/* Filtros: busqueda y estado */}
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

      {/* Tabla: usa clasesFiltradas + conteo de inscritos */}
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
            {/* Render vacio si no hay clases filtradas */}
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

      {/* Resumen: ultimas inscripciones */}
      <section className="clasesResumenPanel">
        <h3>Inscripciones recientes</h3>
        {/* Resumen con ultimas 6 inscripciones */}
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

      {/* Modal: detalles de clase */}
      <ModalInfoTable
        open={infoClaseOpen}
        title="Detalles de la Clase"
        item={selectedClase}
        fields={modalFields}
        actions={modalActions}
        onClose={() => { setInfoClaseOpen(false); setSelectedClase(null); }}
      />

      {/* Modal: inscribir/remover socios */}
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
