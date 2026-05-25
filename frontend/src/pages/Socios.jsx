import { useState, useMemo , useEffect} from 'react';
import {
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    flexRender,
} from '@tanstack/react-table';
import { Search, Download, Plus, SquarePen, CircleDollarSign, Trash2 } from 'lucide-react';
import Papa from 'papaparse';
import '../styles/Index.css'
import '../styles/Socios.css'
import ModalInfoTable from '../components/ModalInfoTable';
import '@fortawesome/fontawesome-free/css/all.min.css';
import AddEditSocio from '../components/AddEditSocio';
import AlertaEliminarSocio from '../components/AlertaEliminarSocio';
import AgregarPago from '../components/AgregarPago';

function Socios() {
    // Estado para filtros, tabla y modales.
    const [globalFilter, setGlobalFilter] = useState(''); // texto de búsqueda en la tabla.
    const [estadoFilter, setEstadoFilter] = useState('Todos'); // filtro por estado (Activo/Inactivo/Todos).
    const [sorting, setSorting] = useState([]); // ordenamiento de la tabla.
    const [selectedSocio, setSelectedSocio] = useState(null); // socio seleccionado para ver info/editar/pagar/eliminar
    const [socios, setSocios] = useState([]); // lista de socios cargada desde el backend.
    const [cargando, setCargando] = useState(true); // bandera de carga inicial.
    
    //controlan visibilidad de modales.
    const [addEditSocioOpen, setAddEditSocioOpen] = useState(false);
    const [infoSocioOpen, setInfoSocioOpen] = useState(false);
    const [agregarPagoOpen, setAgregarPagoOpen] = useState(false);
    const [eliminarSocioOpen, setEliminarSocioOpen] = useState(false);

    // Fetch al backend: obtiene perfiles de socios.
    const cargarSocios = () => {
        fetch('http://127.0.0.1:8000/api/socios/perfiles/')
            .then(res => res.json())
            .then(data => setSocios(data))
            .catch(err => console.error("Error cargando socios:", err));
    };

    // Carga inicial del listado.
    useEffect(() => {
        cargarSocios();
        setCargando(false);
    }, []); 
    
    // Columnas de la tabla (memoizadas).
    const columns = useMemo(() => [
        // { accessorKey: 'id', header: 'ID', size: 70 },
        { accessorKey: 'nombre', header: 'Nombre', size: 165 },
        { accessorKey: 'apellidos', header: 'Apellidos', size: 165 },
        { accessorKey: 'correo', header: 'Correo Electrónico', size: 240 },
        { accessorKey: 'telefono', header: 'Teléfono', size: 130 },
        {
            accessorKey: 'estado',
            header: 'Estado',
            size: 80,
            cell: ({ getValue }) => {
                const estado = getValue();
                return (
                    <span className={`estado ${estado === 'Activo' ? 'activo' : 'inactivo'}`}>
                        {estado}
                    </span>
                );
            },
        },
        {
            id: 'acciones',
            header: 'Acciones',
            cell: ({ row }) => (
                <div className="accionesCell">
                    <button
                        style={{ background: 'none', border: 'none', color: 'var(--mint-primary)', cursor: 'pointer' }}
                        onClick={(e) => {
                            e.stopPropagation();
                            handleAgregarPago(row.original);
                        }}
                    >
                        <CircleDollarSign size={18} />
                        {/* <i class="fa-solid fa-circle-dollar-to-slot"></i> */}
                    </button>
                    <button 
                        onClick={(e) => {
                            e.stopPropagation();
                            handleAddEdit(row.original);
                        }}
                        style={{ background: 'none', border: 'none', color: '#F39C12', cursor: 'pointer' }}
                    >
                        <SquarePen size={18} />
                        {/* <i class="fa-solid fa-pen-to-square"></i> */}
                    </button>
                    <button 
                        onClick={(e) => { 
                            e.stopPropagation(); 
                            handleEliminar(row.original);
                        }}
                        style={{ background: 'none', border: 'none', color: '#E74C3C', cursor: 'pointer' }}
                    >
                        <Trash2 size={18} />
                        {/* <i class="fa-solid fa-trash"></i> */}
                    </button>
                </div>
            ),
        },
    ], []);

    // Filtrado por estado (memoizado).
    const filteredData = useMemo(() => {
        let data = [...socios];
        if (estadoFilter !== 'Todos') {
            data = data.filter(s => s.estado === estadoFilter);
        }
        return data;
    }, [estadoFilter, socios]);

    // Configuracion de la tabla (sorting, filtros, paginacion).
    const table = useReactTable({
        data: filteredData,
        columns,
        state: { sorting, globalFilter },
        onSortingChange: setSorting,
        onGlobalFilterChange: setGlobalFilter,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
    });

    // Exporta la vista filtrada a CSV.
    const exportToCSV = () => {
        const csv = Papa.unparse(filteredData);
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `socios_${new Date().toISOString().slice(0,10)}.csv`;
        link.click();
    };

    // Abre modal de alta/edicion.
    const handleAddEdit = (socio) => {
        setInfoSocioOpen(false);
        setSelectedSocio(socio);
        setAddEditSocioOpen(true);
    }

    // Abre modal de eliminacion.
    const handleEliminar = (socio) => {
        setInfoSocioOpen(false);
        setEliminarSocioOpen(true);
        setSelectedSocio(socio);

    }

    // Abre modal de detalle.
    const handleInfo = (socio) => {
        setInfoSocioOpen(false);
        setSelectedSocio(socio);
        setInfoSocioOpen(true);
    }

    // Abre modal de pago.
    const handleAgregarPago = (socio) => {
        setInfoSocioOpen(false);
        setSelectedSocio(socio);
        setAgregarPagoOpen(true);
    }

    const modalFields = [
        { label: 'ID', key: 'id' },
        { label: 'Nombre', value: (socio) => `${socio.nombre} ${socio.apellidos}` },
        { label: 'Correo Electrónico', key: 'correo' },
        { label: 'Teléfono', key: 'telefono' },
        { label: 'Estado', key: 'estado' },
    ];

    const modalActions = [
        {
            id: 'agregar-pago',
            label: 'Agregar Pago',
            icon: <CircleDollarSign size={18} />, 
            variant: 'primary', 
            onClick: (socio) => handleAgregarPago(socio)
        },
        {   id: 'editar-socio',
            label: 'Editar',
            icon: <SquarePen size={18} />, 
            variant: 'warning', 
            onClick: (socio) => handleAddEdit(socio) 
        },
        {
            id: 'eliminar-socio',
            label: 'Eliminar',
            icon: <Trash2 size={18} />,
            variant: 'danger',
            onClick: (socio) => {
                handleEliminar(socio);
            },
        },
    ];

    return (
        <div id='contendor'>
            <header>
                <h1>Gestión de Socios</h1>
            </header>

            {/* Acciones principales */}
            <div className="acciones">
                <button onClick={() => handleAddEdit(null)}>
                    <Plus size={20} /> Agregar Socio
                </button>
                <button onClick={exportToCSV}>
                    <Download size={20} /> Exportar Lista
                </button>
            </div>

            {/* Filtros y paginacion */}
            <div className="controls">
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
                    <div style={{position: 'relative'}}>
                        <input
                            value={globalFilter ?? ''}
                            onChange={(e) => setGlobalFilter(e.target.value)}
                            placeholder="Buscar socios..."
                            className="searchInput"
                        />
                        <Search size={18} style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: '90%' }}/>
                    </div>

                    <select
                        value={estadoFilter}
                        onChange={(e) => setEstadoFilter(e.target.value)}
                        className="filterSelect"
                    >
                        <option value="Todos">Todos los estados</option>
                        <option value="Activo">Activo</option>
                        <option value="Inactivo">Inactivo</option>
                    </select>
                </div>

                <div style={{ paddingRight: '12px' }}>
                    Página {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}
                </div>
            </div>

            {/* Tabla de socios */}
            <div className="tableContainer">
                <table className="sociosTable">
                    <thead>
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map(header => (
                                    <th
                                        key={header.id}
                                        onClick={header.column.getToggleSortingHandler()}
                                        style={{ width: header.getSize() }}
                                    >
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                        {{ asc: ' ↑', desc: ' ↓' }[header.column.getIsSorted()] ?? ''}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.map(row => (
                            <tr
                                key={row.id}
                                onClick={() => handleInfo(row.original)}
                                style={{ cursor: 'pointer' }}
                            >
                                {row.getVisibleCells().map(cell => (
                                    <td
                                        key={cell.id}
                                        data-label={typeof cell.column.columnDef.header === 'string'
                                            ? cell.column.columnDef.header
                                            : cell.column.id
                                        }
                                    >
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Paginacion */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '15px' }}>
                <button className='btnPaginacion' onClick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage()}>««</button>
                <button className='btnPaginacion' onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>‹</button>
                <button className='btnPaginacion' onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>›</button>
                <button className='btnPaginacion' onClick={() => table.setPageIndex(table.getPageCount() - 1)} disabled={!table.getCanNextPage()}>»»</button>
            </div>


            {/* Modal: alta/edicion de socio */}
            <AddEditSocio
                open={addEditSocioOpen}
                onClose={() => {
                    setAddEditSocioOpen(false);
                    setSelectedSocio(null);
                }}
                item={selectedSocio}
                onActualizar={cargarSocios}
            />
            {/* Modal: detalle de socio */}
            <ModalInfoTable
                open={infoSocioOpen}
                title="Detalles del Socio"
                item={selectedSocio}
                fields={modalFields}
                actions={modalActions}
                onClose={() => {
                    setInfoSocioOpen(false);
                    setSelectedSocio(null);
                }}
                onActualizar={cargarSocios}
            />
            {/* Modal: agregar pago */}
            <AgregarPago
                open={agregarPagoOpen} 
                onClose={() => setAgregarPagoOpen(false)} 
                item={selectedSocio}
                onActualizar={cargarSocios}
            />
            {/* Modal: confirmar eliminacion */}
            <AlertaEliminarSocio
                open={eliminarSocioOpen}
                onClose={() => {
                    setEliminarSocioOpen(false);
                    setSelectedSocio(null);
                }}
                item={selectedSocio}
                onActualizar={cargarSocios}
            />
        </div>
    )
}

export default Socios
