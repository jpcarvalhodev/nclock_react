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
            position: 'relative',
            '&:after': {
                content: '""',
                position: 'absolute',
                right: 0,
                top: 0,
                width: '10px',
                height: '100%',
                background: '#ccc',
            },
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