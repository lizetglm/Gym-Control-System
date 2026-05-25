import { useMemo, useState, useEffect } from 'react';
import { Search, UserPlus, UserMinus, Eye } from 'lucide-react';
import GestionInscripcionDialog from '../components/GestionInscripcionDialog';
import ModalInfoTable from '../components/ModalInfoTable'; 
import '../styles/Index.css';
import '../styles/Clases.css';



function Clases() {
  const [clases, setClases] = useState([]);
  const [socios, setSocios] = useState([]);
  const [selectedClase, setSelectedClase] = useState(null);
  const [inscripciones, setInscripciones] = useState([]);

  const [searchClase, setSearchClase] = useState('');
  const [estadoFiltro, setEstadoFiltro] = useState('Todas');

  // Estados para controlar los modales
  const [gestionModalOpen, setGestionModalOpen] = useState(false);
  const [gestionModalMode, setGestionModalMode] = useState('create');
  const [infoClaseOpen, setInfoClaseOpen] = useState(false); // <-- Nuevo estado para InfoTable


  const cargarInscripciones = () => {
      fetch('http://127.0.0.1:8000/api/clases/inscripciones/')
          .then(res => res.json())
          .then(data => setInscripciones(data));
  };

  useEffect(() => {
      cargarInscripciones();
  }, []);

  const getInscritosCount = (claseId) => inscripciones.filter((i) => i.claseId === claseId).length;

  const closeGestionModal = () => {
    setGestionModalOpen(false);
    setSelectedClase(null);
  };

  // Handlers adaptados para cerrar el panel de info si se ejecutan desde adentro
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

  const handleGuardarInscripcion = ({ claseId, socioId }) => {
    const claseSeleccionada = clases.find((c) => c.id === claseId);
    if (!claseSeleccionada) return;

    const socioSeleccionado = socios.find((s) => String(s.id) === String(socioId));
    if (!socioSeleccionado) return;

    const nuevaInscripcion = {
      id: Date.now(),
      claseId: claseSeleccionada.id,
      claseNombre: claseSeleccionada.nombre,
      socioId: socioSeleccionado.id,
      socioClave: socioSeleccionado.clave,
      socioNombre: `${socioSeleccionado.nombre} ${socioSeleccionado.apellidos}`,
      socioEmail: socioSeleccionado.email,
      fechaInscripcion: new Date().toISOString().slice(0, 10)
    };

    setInscripciones((current) => [nuevaInscripcion, ...current]);
    closeGestionModal();
  };

  const handleEliminarInscripcion = (inscripcionId) => {
    setInscripciones((current) => current.filter((i) => String(i.id) !== String(inscripcionId)));
    closeGestionModal();
  };

  const clasesFiltradas = useMemo(() => {
    return clases.filter((clase) => {
      const byEstado = estadoFiltro === 'Todas' || clase.estado === estadoFiltro;
      const term = searchClase.trim().toLowerCase();
      const byTerm =
        !term ||
        clase.nombre.toLowerCase().includes(term) ||
        clase.instructor.toLowerCase().includes(term) ||
        clase.horario.toLowerCase().includes(term);

      return byEstado && byTerm;
    });
  }, [clases, estadoFiltro, searchClase]);

  const inscripcionesRecientes = useMemo(() => inscripciones.slice(0, 6), [inscripciones]);

  const inscripcionesClaseSeleccionada = useMemo(() => {
    if (!selectedClase) return [];
    return inscripciones.filter((i) => i.claseId === selectedClase.id);
  }, [inscripciones, selectedClase]);

  // Estructura de campos y acciones para el ModalInfoTable genérico
  const modalFields = [
    { label: 'ID Clase', key: 'id' },
    { label: 'Nombre de Clase', key: 'nombre' },
    { label: 'Instructor/a', key: 'instructor' },
    { label: 'Horario programado', key: 'horario' },
    { label: 'Cupo Límite', key: 'cupo' },
    { label: 'Total Inscritos', value: (clase) => `${getInscritosCount(clase.id)} / ${clase.cupo} alumnos` },
    { label: 'Estado', key: 'estado' },
  ];

  const modalActions = [
    {
      id: 'info-inscribir',
      label: 'Inscribir Socio',
      icon: <UserPlus size={18} />,
      variant: 'primary',
      onClick: (clase) => openInscribirSocio(clase)
    },
    {
      id: 'info-remover',
      label: 'Remover socio',
      icon: <UserMinus size={18} />,
      variant: 'danger',
      onClick: (clase) => openEliminarSocio(clase)
    }
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
            onChange={(event) => setSearchClase(event.target.value)}
          />
          <Search size={18} className="clasesSearchIcon" />
        </div>

        <select
          className="filterSelect"
          value={estadoFiltro}
          onChange={(event) => setEstadoFiltro(event.target.value)}
        >
          <option value="Todas">Todas</option>
          <option value="Activa">Activas</option>
          <option value="Pausada">Pausadas</option>
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
            {clasesFiltradas.map((clase) => {
              const srcInscritos = getInscritosCount(clase.id);

              return (
                <tr 
                  key={clase.id} 
                  onClick={() => handleInfoClase(clase)}
                  style={{ cursor: 'pointer' }}
                >
                  <td data-label="Clase">{clase.nombre}</td>
                  <td data-label="Instructor">{clase.instructor}</td>
                  <td data-label="Horario">{clase.horario}</td>
                  <td data-label="Cupo">{clase.cupo}</td>
                  <td data-label="Inscritos">{srcInscritos}</td>
                  <td data-label="Estado">
                    <span className={`estado ${clase.estado === 'Activa' ? 'activo' : 'inactivo'}`}>
                      {clase.estado}
                    </span>
                  </td>
                  <td data-label="Acciones">
                    <div className="accionesCell">
                      <button
                        style={{ background: 'none', border: 'none', color: 'var(--mint-primary)', cursor: 'pointer' }}
                        onClick={(e) => {
                          e.stopPropagation();
                          openInscribirSocio(clase);
                        }}
                        title="Inscribir socio activo"
                      >
                        <UserPlus size={16} />
                      </button>
                      <button
                        style={{ background: 'none', border: 'none', color: '#E74C3C', cursor: 'pointer' }}
                        onClick={(e) => {
                          e.stopPropagation();
                          openEliminarSocio(clase);
                        }}
                        title="Remover socio de la clase"
                      >
                        <UserMinus size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <section className="clasesResumenPanel">
        <h3>Inscripciones recientes</h3>
        {inscripcionesRecientes.length === 0 ? (
          <p className="clasesEmpty">Aún no hay inscripciones registradas en esta sesión.</p>
        ) : (
          <div className="clasesChipGrid">
            {inscripcionesRecientes.map((inscripcion) => (
              <article key={inscripcion.id} className="claseChip">
                <p className="chipTitle">{inscripcion.socioNombre}</p>
                <p style={{ color: 'var(--mint-primary)', fontWeight: 500 }}>{inscripcion.claseNombre}</p>
                <p style={{ color: '#B0B0B0', fontSize: '11px', marginTop: '4px' }}>
                  Inscrito el: {inscripcion.fechaInscripcion}
                </p>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Modal Genérico de Detalles de la Clase */}
      <ModalInfoTable
        open={infoClaseOpen}
        title="Detalles de la Clase"
        item={selectedClase}
        fields={modalFields}
        actions={modalActions}
        onClose={() => {
          setInfoClaseOpen(false);
          setSelectedClase(null);
        }}
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