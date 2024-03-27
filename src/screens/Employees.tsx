import { useState, useEffect } from 'react';
import { Footer } from "../components/Footer";
import { NavBar } from "../components/NavBar";
import '../css/PagesStyles.css';
import EmployeeModal from "../Modals/EmployeeModal";
import IconButton from '@mui/material/IconButton';
import { Delete, Edit, PersonAdd, Refresh, ViewList } from '@mui/icons-material';
import DataTable, { TableColumn } from 'react-data-table-component';
import { ColumnSelectorModal } from '../Modals/ColumnSelectorModal';

export type Employee = {
    [key: string]: any;
    id: string;
    number: number;
    name: string;
    shortName: string;
    nameAcronym: string;
    comments: string;
    photo: string;
    address: string;
    zipcode: string;
    locality: string;
    village: string;
    district: string;
    phone: number;
    mobile: number;
    email: string;
    birthday: string;
    nacionality: string;
    gender: string;
    biNumber: string;
    biIssuance: string;
    biValidity: string;
    nif: number;
    admissionDate: string;
    exitDate: string;
    rgpdAut: string;
    departmentId: string;
    departmentName: string;
    professionId: string;
    professionName: string;
    categoryId: string;
    categoryName: string;
    groupId: string;
    groupName: string;
    zoneId: string;
    zoneName: string;
    externalEntityId: string;
    externalEntityName: string;
};

export const Employees = () => {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [open, setOpen] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
    const [filterText, setFilterText] = useState('');
    const [openColumnSelector, setOpenColumnSelector] = useState(false);
    const [selectedColumns, setSelectedColumns] = useState<string[]>(['number', 'name', 'shortName']);

    const fetchEmployees = () => {
        const token = localStorage.getItem('token');

        fetch('https://localhost:7129/api/Employees', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error fetching employees');
                }
                return response.json();
            })
            .then(data => {
                setEmployees(data);
            })
            .catch(error => console.error('Error fetching the employees', error));
    };

    const deleteEmployee = (id: string) => {
        fetch(`https://localhost:7129/api/Employees/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error deleting employee');
                }
                setEmployees(employees.filter(employee => employee.id !== id));
            })
            .catch(error => console.error(error));
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    const refreshEmployees = () => {
        fetchEmployees();
    };

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpenUpdateModal = (employee: Employee) => {
        setSelectedEmployee(employee);
        setOpen(true);
    };

    const filteredItems = employees.filter(item =>
        Object.keys(item).some(key =>
            String(item[key]).toLowerCase().includes(filterText.toLowerCase())
        )
    );

    const toggleColumn = (columnName: string) => {
        if (selectedColumns.includes(columnName)) {
            setSelectedColumns(selectedColumns.filter(col => col !== columnName));
        } else {
            setSelectedColumns([...selectedColumns, columnName]);
        }
    };

    const resetColumns = () => {
        setSelectedColumns(['number', 'name', 'shortName']);
    };

    let tableColumns = selectedColumns.map(columnName => ({
        name: columnName,
        selector: (row: Employee) => row[columnName],
        sortable: true,
    }));

    const actionColumn: TableColumn<Employee> = {
        name: 'Actions',
        cell: (row: Employee) => (
            <div>
                <IconButton color="primary" aria-label="edit" onClick={() => handleOpenUpdateModal(row)}>
                    <Edit />
                </IconButton>
                <IconButton color="error" aria-label="delete" onClick={() => deleteEmployee(row.id)}>
                    <Delete />
                </IconButton>
            </div>
        ),
        selector: undefined,
    };

    return (
        <div>
            <NavBar />
            <div className='refresh-add-edit-upper-class'>
                <IconButton className='refresh-button' color="primary" aria-label="refresh" onClick={refreshEmployees}>
                    <Refresh />
                </IconButton>
                <IconButton className='add-button' color="primary" aria-label="add-employee" onClick={handleOpen}>
                    <PersonAdd />
                </IconButton>
                <IconButton className='edit-columns' color="primary" aria-label="view-list" onClick={() => setOpenColumnSelector(true)}>
                    <ViewList />
                </IconButton>
                <EmployeeModal open={open} onClose={handleClose} employee={selectedEmployee} />
            </div>
            <div>
                <input
                    type="text"
                    placeholder="Filter"
                    value={filterText}
                    onChange={e => setFilterText(e.target.value)}
                />
                <div className='table-css'>
                    <DataTable
                        columns={[...tableColumns, actionColumn]}
                        data={filteredItems}
                        pagination
                    />
                </div>
            </div>
            {openColumnSelector && (
                <ColumnSelectorModal
                    columns={Object.keys(filteredItems[0])}
                    selectedColumns={selectedColumns}
                    onClose={() => setOpenColumnSelector(false)}
                    onColumnToggle={toggleColumn}
                    onResetColumns={resetColumns}
                />
            )}
            <Footer />
        </div>
    );
}
