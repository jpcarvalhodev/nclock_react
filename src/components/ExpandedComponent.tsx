interface ExpandedComponentProps {
    data: Record<string, any>;
    fields: { key: string; label: string }[];
}

export const ExpandedComponent = ({ data, fields }: ExpandedComponentProps) => {
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
            {fields.map(({ key, label }) => {
                const value = data[key];
                const displayValue = formatDisplayValue(value);
                return (
                    <p key={key}>
                        <span className="detail-key">{`${label}: `}</span>
                        {displayValue}
                    </p>
                );
            })}
        </div>
    );
};
