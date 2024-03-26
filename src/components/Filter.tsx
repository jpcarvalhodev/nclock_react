import { useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

type FilterProps = {
    filters: { value: string; label: string }[];
    handleFilterSelection: (value: string) => void;
  };

  export const Filter = ({ handleFilterSelection }: FilterProps) => {
    const [selectedFilter, setSelectedFilter] = useState('');
  
    const filters = [
      { value: 'name-asc', label: 'Name (A-Z)' },
      { value: 'name-desc', label: 'Name (Z-A)' },
      { value: 'number-asc', label: 'Number (Low-High)' },
      { value: 'number-desc', label: 'Number (High-Low)' },
    ];
  
    const handleChange = (event: any) => {
      const { value } = event.target;
      setSelectedFilter(value);
      handleFilterSelection(value);
    };
  
    return (
      <FormControl variant="outlined" sx={{ minWidth: 120, minHeight: 10 }}>
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
