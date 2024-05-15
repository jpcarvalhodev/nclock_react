import Split from "split.js";
import { Footer } from "../../components/Footer";
import { NavBar } from "../../components/NavBar"
import { TreeViewData } from "../../components/TreeView";
import { useState } from "react";
import { Employee } from "../../helpers/Types";

export const Movement = () => {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);

    const handleSelectFromTreeView = (selectedIds: string[]) => {
        if (selectedIds.length === 0) {
            setFilteredEmployees(employees);
        } else {
            const filtered = employees.filter(employee => selectedIds.includes(employee.employeeID));
            setFilteredEmployees(filtered);
        }
    };

    return (
        <div className="main-container">
            <NavBar />
            <div className="content-container">
                <Split className='split' sizes={[20, 80]} minSize={250} expandToMin={true} gutterSize={15} gutterAlign="center" snapOffset={0} dragInterval={1}>
                    <div className="treeview-container">
                        <TreeViewData onSelectEmployees={handleSelectFromTreeView} />
                    </div>
                    <div className="datatable-title-text">
                        <span>Movimentos</span>
                    </div>
                </Split>
            </div>
            <Footer />
        </div>
    );
}