import { useEffect, useState } from "react";
import { NavBar } from "../components/NavBar";
import { IconButton } from "@mui/material";
import { PersonAdd, Refresh, Delete, Edit, ViewList } from "@mui/icons-material";
import { Footer } from "../components/Footer";
import '../css/PagesStyles.css';
import DepartmentsModal from "../Modals/DepartmentsModal";
import { ColumnSelectorModal } from "../Modals/ColumnSelectorModal";
import DataTable, { TableColumn } from 'react-data-table-component';

export type Department = {
    [key: string]: any;
    id: string,
    code: number,
    name: string,
    description: string,
    paiId: number,
};

export const Departments = () => {
    const [departments, setDepartments] = useState<Department[]>([]);
    const [open, setOpen] = useState(false);
    const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);
    const [filterText, setFilterText] = useState('');
    const [openColumnSelector, setOpenColumnSelector] = useState(false);
    const [selectedColumns, setSelectedColumns] = useState<string[]>(['code', 'name']);

    const fetchDepartments = () => {
        const token = localStorage.getItem('token');

        fetch('https://localhost:7129/api/Departaments', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error fetching departments data');
                }
                return response.json();
            })
            .then(data => {
                setDepartments(data);
            })
            .catch(error => console.error('Error fetching the departments', error));
    };

    const deleteDepartment = (id: string) => {
        fetch(`https://localhost:7129/api/Departaments/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error deleting department');
                }
                refreshDepartments();
            })
            .catch(error => console.error(error));
    };

    useEffect(() => {
        fetchDepartments();
    }, []);

    const refreshDepartments = () => {
        fetchDepartments();
    };

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpenUpdateModal = (department: Department) => {
        setSelectedDepartment(department);
        setOpen(true);
    };

    const filteredItems = departments.filter(item =>
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
        setSelectedColumns(['code', 'name']);
    };

    let tableColumns = selectedColumns.map(columnName => ({
        name: columnName,
        selector: (row: Department) => row[columnName],
        sortable: true,
      }));

    const actionColumn: TableColumn<Department> = {
        name: 'Actions',
        cell: (row: Department) => (
            <div>
                <IconButton color="primary" aria-label="edit" onClick={() => handleOpenUpdateModal(row)}>
                    <Edit />
                </IconButton>
                <IconButton color="error" aria-label="delete" onClick={() => deleteDepartment(row.id)}>
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
                <IconButton className='refresh-button' color="primary" aria-label="refresh" onClick={refreshDepartments}>
                    <Refresh />
                </IconButton>
                <IconButton className='add-button' color="primary" aria-label="add-department" onClick={handleOpen}>
                    <PersonAdd />
                </IconButton>
                <IconButton className='edit-columns' color="primary" aria-label="view-list" onClick={() => setOpenColumnSelector(true)}>
                    <ViewList />
                </IconButton>
                <DepartmentsModal open={open} onClose={handleClose} department={selectedDepartment} />
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
            <Footer />
            {openColumnSelector && (
                <ColumnSelectorModal
                    columns={Object.keys(filteredItems[0])}
                    selectedColumns={selectedColumns}
                    onClose={() => setOpenColumnSelector(false)}
                    onColumnToggle={toggleColumn}
                    onResetColumns={resetColumns}
                />
            )}
        </div >
    );
}