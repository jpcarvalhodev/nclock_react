import { TableStyles } from 'react-data-table-component';

// Define estilização customizada para o DataTable
export const customStyles: TableStyles = {
    pagination: {
        style: {
            minHeight: 0,
            padding: 0,
            margin: 0,
        },
    },
    rows: {
        style: {
            minHeight: '28px',
            padding: 0,
            margin: 0,
        },
        stripedStyle: {
            backgroundColor: '#f2f2f2',
        },
        highlightOnHoverStyle: {
            backgroundColor: '#ccc',
        },
    },
    headCells: {
        style: {
            minHeight: '30px',
            backgroundColor: '#ccc',
            color: '#333',
            fontWeight: 'bold',
            border: 'none',
            padding: 0,
            margin: 0,
        },
    },
    headRow: {
        style: {
            minHeight: '30px',
            backgroundColor: '#ccc',
            padding: 0,
            margin: 0,
        },
    },
    cells: {
        style: {
            border: 'none',
            padding: 0,
            margin: 0,
        },
    },
};