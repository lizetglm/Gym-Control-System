import { useMemo, useState } from 'react';
import { Search, UserPlus, UserPen, UserMinus } from 'lucide-react';
import GestionInscripcionDialog from '../components/GestionInscripcionDialog';
import '../styles/Index.css';
import '../styles/Clases.css';

const clasesMock = [
  {
    id: 1,
    nombre: 'Yoga Funcional',
    instructor: 'Carla Mendoza',
    horario: 'Lunes y Miércoles 7:00 pm',
    cupo: 20,
    estado: 'Activa',
    precios: { visita: 80, mensual: 500, trimestral: 1300, anual: 4200 },
  },
  {
    id: 2,
    nombre: 'Spinning Pro',
    instructor: 'Luis Herrera',
    horario: 'Martes y Jueves 6:00 am',
    cupo: 18,
    estado: 'Activa',
    precios: { visita: 100, mensual: 650, trimestral: 1700, anual: 5200 },
  },
  {
    id: 3,
    nombre: 'Pilates Core',
    instructor: 'Fernanda Soto',
    horario: 'Viernes 8:00 am',
    cupo: 15,
    estado: 'Pausada',
    precios: { visita: 90, mensual: 550, trimestral: 1450, anual: 4600 },
  },
];

const sociosMock = [
  {
    id: 1,
    clave: 'SOC-0001',
    nombre: 'Juan',
    apellidos: 'Torres Medina',
    email: 'juan.torres@example.com',
    estado: 'Activo',
  },
  {
    id: 2,
    clave: 'SOC-0002',
    nombre: 'Maria',
    apellidos: 'Gomez',
    email: 'maria.gomez@example.com',
    estado: 'Activo',
  },
  {
    id: 3,
    clave: 'SOC-0003',
    nombre: 'Carlos',
    apellidos: 'Sanchez',
    email: 'carlos.sanchez@example.com',
    estado: 'Inactivo',
  },
  {
    id: 4,
    clave: 'SOC-0004',
    nombre: 'Valentina',
    apellidos: 'Martinez',
    email: 'valentina.martinez@example.com',
    estado: 'Activo',
  },
];

const currencyFormatter = new Intl.NumberFormat('es-MX', {
  style: 'currency',
  currency: 'MXN',
});

function generarClaveSocio(sociosListado) {
  const maxNumero = sociosListado.reduce((max, socio) => {
    const coincidencia = String(socio.clave ?? '').match(/(\d+)$/);
    const numero = coincidencia ? Number(coincidencia[1]) : 0;
    return Math.max(max, numero);
  }, 0);

  return `SOC-${String(maxNumero + 1).padStart(4, '0')}`;
}

function sumarPeriodo(fechaInicio, tipoPago) {
  if (!fechaInicio) return '';

  const [year, month, day] = fechaInicio.split('-').map(Number);
  const fecha = new Date(year, month - 1, day);

  if (tipoPago === 'visita') {
    fecha.setDate(fecha.getDate() + 1);
  } else if (tipoPago === 'mensual') {
    fecha.setMonth(fecha.getMonth() + 1);
  } else if (tipoPago === 'trimestral') {
    fecha.setMonth(fecha.getMonth() + 3);
  } else if (tipoPago === 'anual') {
    fecha.setFullYear(fecha.getFullYear() + 1);
  }

  return fecha.toISOString().slice(0, 10);
}

function getMontoClase(clase, tipoPago) {
  return clase?.precios?.[tipoPago] ?? 0;
}

function Clases() {
  const [clases] = useState(clasesMock);
  const [socios, setSocios] = useState(sociosMock);
  const [selectedClase, setSelectedClase] = useState(null);
  const [inscripciones, setInscripciones] = useState([]);

  const [searchClase, setSearchClase] = useState('');
  const [estadoFiltro, setEstadoFiltro] = useState('Todas');

  const [gestionModalOpen, setGestionModalOpen] = useState(false);
  const [gestionModalMode, setGestionModalMode] = useState('create');

  const getInscritosCount = (claseId) => inscripciones.filter((inscripcion) => inscripcion.claseId === claseId).length;

  const closeGestionModal = () => {
    setGestionModalOpen(false);
    setSelectedClase(null);
  };

  const openInscribirSocio = (clase) => {
    setSelectedClase(clase);
    setGestionModalMode('create');
    setGestionModalOpen(true);
  };

  const openEditarSocio = (clase) => {
    setSelectedClase(clase);
    setGestionModalMode('edit');
    setGestionModalOpen(true);
  };

  const openEliminarSocio = (clase) => {
    setSelectedClase(clase);
    setGestionModalMode('delete');
    setGestionModalOpen(true);
  };

  const crearSocio = (nuevoSocio) => {
    const socioCreado = {
      id: Date.now(),
      clave: generarClaveSocio(socios),
      nombre: nuevoSocio.nombre?.trim() ?? '',
      apellidos: nuevoSocio.apellidos?.trim() ?? '',
      email: nuevoSocio.email?.trim() ?? '',
      telefono: nuevoSocio.telefono?.trim() ?? '',
      estado: 'Activo',
    };

    setSocios((current) => [...current, socioCreado]);
    return socioCreado;
  };

  const handleGuardarInscripcion = ({ mode, claseId, targetInscripcionId, socioModo, existingSocioId, nuevoSocio, tipoPago, fechaInicio, monto: montoFromDialog }) => {
    const claseSeleccionada = clases.find((clase) => clase.id === claseId);

    if (!claseSeleccionada) return;

    const socioSeleccionado =
      socioModo === 'nuevo'
        ? crearSocio(nuevoSocio)
        : socios.find((socio) => String(socio.id) === String(existingSocioId));

    if (!socioSeleccionado) return;
    const monto = typeof montoFromDialog === 'number' && !Number.isNaN(montoFromDialog) ? montoFromDialog : getMontoClase(claseSeleccionada, tipoPago);
    const fechaFin = sumarPeriodo(fechaInicio, tipoPago);

    if (mode === 'edit') {
      setInscripciones((current) =>
        current.map((inscripcion) =>
          String(inscripcion.id) === String(targetInscripcionId)
            ? {
                ...inscripcion,
                socioId: socioSeleccionado.id,
                socioClave: socioSeleccionado.clave,
                socioNombre: socioSeleccionado.nombre,
                socioApellidos: socioSeleccionado.apellidos,
                socioEmail: socioSeleccionado.email,
                tipoPago,
                fechaInicio,
                fechaFin,
                monto,
              }
            : inscripcion,
        ),
      );
    } else {
      const nuevaInscripcion = {
        id: Date.now(),
        claseId: claseSeleccionada.id,
        claseNombre: claseSeleccionada.nombre,
        socioId: socioSeleccionado.id,
        socioClave: socioSeleccionado.clave,
        socioNombre: socioSeleccionado.nombre,
        socioApellidos: socioSeleccionado.apellidos,
        socioEmail: socioSeleccionado.email,
        tipoPago,
        fechaInicio,
        fechaFin,
        monto,
      };

      setInscripciones((current) => [nuevaInscripcion, ...current]);
    }

    closeGestionModal();
  };

  const handleEliminarInscripcion = (inscripcionId) => {
    setInscripciones((current) => current.filter((inscripcion) => String(inscripcion.id) !== String(inscripcionId)));
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

    return inscripciones.filter((inscripcion) => inscripcion.claseId === selectedClase.id);
  }, [inscripciones, selectedClase]);

  return (
    <div id="contendor">
      <header>
        <h1>Gestion de Clases</h1>
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
              const inscritos = getInscritosCount(clase.id);

              return (
                <tr key={clase.id}>
                  <td data-label="Clase">{clase.nombre}</td>
                  <td data-label="Instructor">{clase.instructor}</td>
                  <td data-label="Horario">{clase.horario}</td>
                  <td data-label="Cupo">{clase.cupo}</td>
                  <td data-label="Inscritos">{inscritos}</td>
                  <td data-label="Estado">
                    <span className={`estado ${clase.estado === 'Activa' ? 'activo' : 'inactivo'}`}>
                      {clase.estado}
                    </span>
                  </td>
                  <td data-label="Acciones">
                    <div className="accionesCell">
                      <button
                        className="iconButton iconMint"
                        onClick={() => openInscribirSocio(clase)}
                        title="Inscribir socio"
                      >
                        <UserPlus size={16} />
                      </button>
                      <button
                        className="iconButton iconMint"
                        onClick={() => openEliminarSocio(clase)}
                        title="Eliminar socio"
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
          <p className="clasesEmpty">Aun no hay inscripciones registradas.</p>
        ) : (
          <div className="clasesChipGrid">
            {inscripcionesRecientes.map((inscripcion) => (
              <article key={inscripcion.id} className="claseChip">
                <p className="chipTitle">{inscripcion.socioNombre}</p>
                <p>{inscripcion.claseNombre}</p>
                <p>
                  {inscripcion.fechaInicio} - {inscripcion.fechaFin}
                </p>
                <p>
                  {inscripcion.tipoPago} | {currencyFormatter.format(inscripcion.monto)}
                </p>
              </article>
            ))}
          </div>
        )}
      </section>

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
