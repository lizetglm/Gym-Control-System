import { useState, useMemo } from 'react';
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


const dataMock = [
    { id: 1, nombre: "Juan de la Cruz", apellidos: "Torres Medina", email: "juanjuanjuanjuan.perez@example.com", telefono: "555-1234", estado: "Activo" },
    { id: 2, nombre: "María", apellidos: "Gómez", email: "maria.gomez@example.com", telefono: "555-5678", estado: "Inactivo" },
    { id: 3, nombre: "Ester Rocio", apellidos: "Gómez", email: "ester.gomez@example.com", telefono: "555-9101", estado: "Activo" },
    { id: 4, nombre: "Angela", apellidos: "Aguilar Gómez", email: "angela.aguilar@example.com", telefono: "555-1122", estado: "Inactivo" },
    { id: 5, nombre: "Ignacio", apellidos: "Gómez", email: "ignacio.gomez@example.com", telefono: "555-3344", estado: "Activo" },
    { id: 6, nombre: "Lizet Guadalupe", apellidos: "Lopez Medina", email: "lizet.lopez@example.com", telefono: "4451455437", estado: "Inactivo" },
    { id: 7, nombre: "Carlos", apellidos: "Sánchez", email: "carlos.sanchez@example.com", telefono: "555-5678", estado: "Activo" },
    { id: 8, nombre: "Sofía", apellidos: "Ramírez", email: "sofia.ramirez@example.com", telefono: "555-5678", estado: "Inactivo" },
    { id: 9, nombre: "Miguel", apellidos: "Hernández", email: "miguel.hernandez@example.com", telefono: "555-5678", estado: "Activo" },
    { id: 10, nombre: "Lucía", apellidos: "Fernández", email: "lucia.fernandez@example.com", telefono: "555-5678", estado: "Inactivo" },
    { id: 11, nombre: "Diego", apellidos: "García", email: "diego.garcia@example.com", telefono: "555-5678", estado: "Activo" },
    { id: 12, nombre: "Valentina", apellidos: "Martínez", email: "valentina.martinez@example.com", telefono: "555-5678", estado: "Inactivo" },
    { id: 13, nombre: "Andrés", apellidos: "López", email: "andres.lopez@example.com", telefono: "555-5678", estado: "Activo" },
    { id: 14, nombre: "Camila", apellidos: "Gómez", email: "camila.gomez@example.com", telefono: "555-5678", estado: "Inactivo" },
];

function Socios() {
    "use no memo";

    const [globalFilter, setGlobalFilter] = useState('');
    const [estadoFilter, setEstadoFilter] = useState('Todos');
    const [sorting, setSorting] = useState([]);
    const [selectedSocio, setSelectedSocio] = useState(null);
    const [socios, setSocios] = useState(dataMock);
    const [addEditSocioOpen, setAddEditSocioOpen] = useState(false);
    const [infoSocioOpen, setInfoSocioOpen] = useState(false);
    const [agregarPagoOpen, setAgregarPagoOpen] = useState(false);
    const [eliminarSocioOpen, setEliminarSocioOpen] = useState(false);
    
    const columns = useMemo(() => [
        // { accessorKey: 'id', header: 'ID', size: 70 },
        { accessorKey: 'nombre', header: 'Nombre', size: 160 },
        { accessorKey: 'apellidos', header: 'Apellidos', size: 160 },
        { accessorKey: 'email', header: 'Correo Electrónico', size: 220 },
        { accessorKey: 'telefono', header: 'Teléfono', size: 130 },
        {
            accessorKey: 'estado',
            header: 'Estado',
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

    // Filtrado por estado
    const filteredData = useMemo(() => {
        let data = [...socios];
        if (estadoFilter !== 'Todos') {
            data = data.filter(s => s.estado === estadoFilter);
        }
        return data;
    }, [estadoFilter, socios]);

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

    const exportToCSV = () => {
        const csv = Papa.unparse(filteredData);
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `socios_${new Date().toISOString().slice(0,10)}.csv`;
        link.click();
    };

    const handleAddEdit = (socio) => {
        setInfoSocioOpen(false);
        setSelectedSocio(socio);
        setAddEditSocioOpen(true);
    }

    const handleEliminar = (socio) => {
        setInfoSocioOpen(false);
        setEliminarSocioOpen(true);
        setSelectedSocio(socio);

    }

    const handleInfo = (socio) => {
        setInfoSocioOpen(false);
        setSelectedSocio(socio);
        setInfoSocioOpen(true);
    }

    const handleAgregarPago = (socio) => {
        setInfoSocioOpen(false);
        setSelectedSocio(socio);
        setAgregarPagoOpen(true);
    }

    const modalFields = [
        { label: 'ID', key: 'id' },
        { label: 'Nombre', value: (socio) => `${socio.nombre} ${socio.apellidos}` },
        { label: 'Correo Electrónico', key: 'email' },
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

            <div className="acciones">
                <button onClick={() => handleAddEdit(null)}>
                    <Plus size={20} /> Agregar Socio
                </button>
                <button onClick={exportToCSV}>
                    <Download size={20} /> Exportar Lista
                </button>
            </div>

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

            {/* Paginación */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '15px' }}>
                <button className='btnPaginacion' onClick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage()}>««</button>
                <button className='btnPaginacion' onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>‹</button>
                <button className='btnPaginacion' onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>›</button>
                <button className='btnPaginacion' onClick={() => table.setPageIndex(table.getPageCount() - 1)} disabled={!table.getCanNextPage()}>»»</button>
            </div>


            <AddEditSocio
                open={addEditSocioOpen}
                onClose={() => {
                    setAddEditSocioOpen(false);
                    setSelectedSocio(null);
                }}
                item={selectedSocio}
            />
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
            />
            <AgregarPago
                open={agregarPagoOpen} 
                onClose={() => setAgregarPagoOpen(false)} 
                item={selectedSocio}

            />
            <AlertaEliminarSocio
                open={eliminarSocioOpen}
                onClose={() => {
                    setEliminarSocioOpen(false);
                    setSelectedSocio(null);
                }}
                item={selectedSocio}
            />
        </div>
    )
}

export default Socios
