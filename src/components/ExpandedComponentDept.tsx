import { useEffect, useState } from 'react';
import { departmentFields } from '../helpers/Fields';

interface DepartmentData {
    [key: string]: any;
    code: number;
    name: string;
    paiId?: number;
    subdepartments?: DepartmentData[];
}

interface ExpandedComponentProps {
    data: DepartmentData;
    fetchSubdepartments: (parentId: number) => Promise<DepartmentData[]>;
    isRoot?: boolean;
}

export const ExpandedComponentDept = ({ data, fetchSubdepartments, isRoot }: ExpandedComponentProps) => {
    const [subdepartments, setSubdepartments] = useState<DepartmentData[]>(data.subdepartments || []);

    useEffect(() => {
        if (data.paiId !== null && data.paiId !== undefined) {
            fetchSubdepartments(data.code)
                .then(fetchedSubdepartments => {
                    const validSubdepartments = fetchedSubdepartments.filter(sub => sub.paiId === data.code);
                    setSubdepartments(validSubdepartments);
                })
                .catch(error => console.error("Failed to fetch subdepartments:", error));
        }
    }, [data, fetchSubdepartments]);

    const formatDisplayValue = (value: any, type: string): string => {
        if (value === null || value === undefined) {
            return 'N/A';
        } else if (typeof value === 'object' && value !== null) {
            return JSON.stringify(value, null, 2);
        }
        return value.toString();
    };

    return (
        <div style={{ marginLeft: '20px' }}>
            <div>
                {departmentFields.map(({ key, label, type }) => {
                    const value = data[key];
                    const displayValue = formatDisplayValue(value, type);
                    return (
                        <div key={key} className="entity-detail">
                            <strong>{label}: </strong>{displayValue}
                        </div>
                    );
                })}
            </div>
            {isRoot && <p style={{ marginTop: 15 }}><strong>Subdepartamentos:</strong></p>}
            {subdepartments.length > 0 && (
                <div style={{ marginLeft: '20px', marginTop: '10px' }}>
                    {subdepartments.map(subdept => (
                        <ExpandedComponentDept
                            key={subdept.code}
                            data={subdept}
                            fetchSubdepartments={fetchSubdepartments}
                            isRoot={false}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};
