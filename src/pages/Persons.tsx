import { useCallback, useEffect, useState } from 'react';
import { Footer } from "../components/Footer";
import { NavBar } from "../components/NavBar";
import { PersonsDataTable } from "../components/PersonsDataTable";
import { TreeViewData } from "../components/TreeView";
import { CustomOutlineButton } from '../components/CustomOutlineButton';
import Split from 'react-split';
import '../css/PagesStyles.css';

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
                <Split className='split' sizes={[20, 80]} minSize={100} expandToMin={true} gutterSize={15} gutterAlign="center" snapOffset={0} dragInterval={1}>
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
                </Split>
            </div>
            <Footer />
        </div>
    );
};
