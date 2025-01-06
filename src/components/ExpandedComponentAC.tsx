// Define as propriedades do componente
interface ExpandedComponentProps {
    data: Array<Record<string, any>>;
    fields: { key: string; label: string }[];
}

// Define o componente para exibir dados de portas
export const ExpandedComponentAC = ({ data, fields }: ExpandedComponentProps) => {
    const formatDisplayValue = (value: any): string => {
        if (typeof value === 'object' && value !== null) {
            return JSON.stringify(value, null, 2);
        } else if (value === undefined) {
            return '';
        }
        return value.toString();
    };

    return (
        <div className="expanded-details-container">
            <h4>Portas Autorizadas:</h4>
            {data.length > 0 ? (
                data.map((item, index) => (
                    <div key={index} className="entity-details-grid" style={{ marginBottom: '20px' }}>
                        {fields.map(({ key, label }) => {
                            const value = item ? item[key] : '';
                            const displayValue = formatDisplayValue(value);
                            return (
                                <div key={key} className="entity-detail">
                                    <span className="detail-key">{`${label}: `}</span>
                                    {displayValue}
                                </div>
                            );
                        })}
                    </div>
                ))
            ) : <div>Nenhuma porta encontrada</div>}
        </div>
    );
};