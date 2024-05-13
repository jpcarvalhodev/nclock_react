interface ExpandedComponentProps {
    data: Record<string, any>;
    fields: { key: string; label: string }[];
}

export const ExpandedComponentGeneric = ({ data, fields }: ExpandedComponentProps) => {
    const formatDisplayValue = (value: any): string => {
        if (typeof value === 'object' && value !== null) {
            return JSON.stringify(value, null, 2);
        } else if (value === undefined) { 
            return 'N/A';
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