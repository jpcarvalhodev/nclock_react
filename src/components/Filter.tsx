import { useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

type FilterProps = {
    filters: { value: string; label: string }[];
    handleFilterSelection: (value: string) => void;
  };

export const Filter = ({ filters, handleFilterSelection }: FilterProps) => {
  const [selectedFilter, setSelectedFilter] = useState('');

  const handleChange = (event: any) => {
    const { value } = event.target;
    setSelectedFilter(value);
    handleFilterSelection(value);
  };

  return (
    <FormControl variant="outlined" sx={{ minWidth: 120 }}>
      <InputLabel id="filter-label">Filter</InputLabel>
      <Select
        labelId="filter-label"
        id="filter-select"
        value={selectedFilter}
        onChange={handleChange}
        label="Filter"
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {filters.map((filter) => (
          <MenuItem key={filter.value} value={filter.value}>
            {filter.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
