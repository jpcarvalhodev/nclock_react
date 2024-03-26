import React from 'react';
import { Dialog, DialogTitle, DialogContent, FormControlLabel, Checkbox, Button, DialogActions, styled } from '@mui/material';

interface EmployeeColumnSelectorModalProps {
    columns: string[];
    selectedColumns: string[];
    onClose: () => void;
    onColumnToggle: (columnName: string) => void;
    onResetColumns: () => void;
}

const StyledDialog = styled(Dialog)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
});

const StyledDialogContent = styled(DialogContent)({
    width: 400,
});

export const EmployeeColumnSelectorModal: React.FC<EmployeeColumnSelectorModalProps> = ({
    columns,
    selectedColumns,
    onClose,
    onColumnToggle,
    onResetColumns,
}) => {
    return (
        <StyledDialog open={true} onClose={onClose}>
            <DialogTitle>Select Columns</DialogTitle>
            <StyledDialogContent>
                {columns.map(columnName => (
                    <FormControlLabel
                        key={columnName}
                        control={<Checkbox checked={selectedColumns.includes(columnName)} onChange={() => onColumnToggle(columnName)} />}
                        label={columnName}
                    />
                ))}
            </StyledDialogContent>
            <DialogActions>
                <Button onClick={onResetColumns}>Reset</Button>
                <Button onClick={onClose}>Close</Button>
            </DialogActions>
        </StyledDialog>
    );
};