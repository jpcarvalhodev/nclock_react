import { useState } from 'react';
import { Footer } from "../components/Footer";
import { NavBar } from "../components/NavBar";
import { PersonsDataTable } from "../components/PersonsDataTable";
import { TreeViewData } from "../components/TreeView";
import '../css/PagesStyles.css';

export const Persons = () => {
    const [selectedEmployeeIds, setSelectedEmployeeIds] = useState<string[]>([]);

    const handleSelectEmployees = (employeeIds: string[] | null) => {
        setSelectedEmployeeIds(employeeIds || []);
    };

    return (
        <div className="main-container">
            <NavBar />
            <div className="content-container">
                <div className="treeview-container">
                    <TreeViewData onSelectEmployees={handleSelectEmployees} />
                </div>
                <div className="datatable-container">
                    <PersonsDataTable selectedEmployeeIds={selectedEmployeeIds} />
                </div>
            </div>
            <Footer />
        </div>
    );
};