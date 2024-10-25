import { TableStyles } from 'react-data-table-component';

// Define estilização customizada para o DataTable
export const customStyles: TableStyles = {
    rows: {
        style: {
            minHeight: '30px',
            paddingLeft: '5px',
            paddingRight: '5px',
        },
    },
    headCells: {
        style: {
            backgroundColor: '#f0f0f0',
            color: '#333',
            fontWeight: 'bold',
            height: '30px',
            border: 'none',
            paddingLeft: '5px',
            paddingRight: '5px',
        },
    },
    headRow: {
        style: {
            minHeight: '30px',
            backgroundColor: '#f0f0f0',
            paddingLeft: '5px',
            paddingRight: '5px',
        },
    },
    cells: {
        style: {
            border: 'none',
            paddingLeft: '5px',
            paddingRight: '5px',
        },
    },
};