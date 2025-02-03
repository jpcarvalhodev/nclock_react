// Define as propriedades do componente
interface ExpandedComponentProps {
    data: Record<string, any>;
    fields: { key: string; label: string }[];
}

// Define o componente
export const ExpandedComponentGeneric = ({ data, fields }: ExpandedComponentProps) => {
    
    const formatDisplayValue = (value: any): string => {
        if (value === null || value === undefined) {
            return '';
        }
        if (typeof value === 'object') {
            return JSON.stringify(value, null, 2);
        }
        return value.toString();
    };

    return (
        <div className="expanded-details-container">
            <div className="entity-details-grid">
                {fields.map(({ key, label }) => {
                    const value = data[key];
                    const displayValue = formatDisplayValue(value);
                    return (
                        <div key={key} className="entity-detail">
                            <span className="detail-key">{`${label}: `}</span>
                            {displayValue}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};