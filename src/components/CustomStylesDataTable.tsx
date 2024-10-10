import { TableStyles } from 'react-data-table-component';

// Define estilização customizada para o DataTable
export const customStyles: TableStyles = {
    rows: {
        style: {
            minHeight: '30px',
        },
    },
    headCells: {
        style: {
            backgroundColor: '#f0f0f0',
            color: '#333',
            fontWeight: 'bold',
            height: '30px',
            border: 'none',
        },
    },
    headRow: {
        style: {
            minHeight: '30px',
            backgroundColor: '#f0f0f0',
        },
    },
    cells: {
        style: {
            border: 'none',
        },
    },
};