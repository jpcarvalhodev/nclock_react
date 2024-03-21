import React, { useState } from "react";

type FilterProps = {
    number: string;
    name: string;
    shortName: string;
    nameAcronym: string;
};

type FilterComponentProps = {
    filters: FilterProps;
};

export const Filter: React.FC<FilterComponentProps> = ({ filters }) => {
    const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

    const handleFilterSelection = (filter: string) => {
        if (selectedFilters.includes(filter)) {
            setSelectedFilters(selectedFilters.filter((selected) => selected !== filter));
        } else {
            setSelectedFilters([...selectedFilters, filter]);
        }
    };

    return (
        <div>
            {Object.keys(filters).map((filterKey) => (
                <label key={filterKey}>
                    <input
                        type="checkbox"
                        checked={selectedFilters.includes(filterKey)}
                        onChange={() => handleFilterSelection(filterKey)}
                    />
                    {filterKey}
                </label>
            ))}
        </div>
    );
};