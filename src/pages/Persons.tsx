import { useCallback, useState } from 'react';
import { Footer } from "../components/Footer";
import { NavBar } from "../components/NavBar";
import { PersonsDataTable } from "../components/PersonsDataTable";
import { TreeViewData } from "../components/TreeView";
import '../css/PagesStyles.css';
import { CustomOutlineButton } from '../components/CustomOutlineButton';

export const Persons = () => {
    const [selectedEmployeeIds, setSelectedEmployeeIds] = useState<string[]>([]);

    const handleSelectEmployees = (employeeIds: string[]) => {
        setSelectedEmployeeIds(employeeIds);
    };

    const removeAllEmployees = () => {
        setSelectedEmployeeIds([]);
    };

    const refreshEmployeeData = useCallback(() => {
        setSelectedEmployeeIds([...selectedEmployeeIds]);
    }, [selectedEmployeeIds]);

    return (
        <div className="main-container">
            <NavBar />
            <div className="content-container">
                <div className="treeview-container">
                    <TreeViewData onSelectEmployees={handleSelectEmployees} />
                </div>
                <div className="datatable-container">
                    <div className="datatable-header">
                        <CustomOutlineButton icon="bi-arrow-clockwise" onClick={refreshEmployeeData} iconSize='1.1em' />
                        <CustomOutlineButton icon="bi-trash" onClick={removeAllEmployees} iconSize='1.1em' />
                    </div>
                    <PersonsDataTable selectedEmployeeIds={selectedEmployeeIds} />
                </div>
            </div>
            <Footer />
        </div>
    );
};