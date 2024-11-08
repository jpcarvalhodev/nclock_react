import { TableStyles } from 'react-data-table-component';

// Define estilização customizada para o DataTable
export const customStyles: TableStyles = {
    rows: {
        style: {
            minHeight: '30px',
            padding: 0,
            margin: 0,
        },
    },
    headCells: {
        style: {
            minHeight: '30px',
            backgroundColor: '#f0f0f0',
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
            backgroundColor: '#f0f0f0',
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