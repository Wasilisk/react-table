import {
    Box,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Popover,
    Select,
    SelectChangeEvent,
    Tooltip,
    Typography,
    Stack
} from "@mui/material";

import { useState } from "react";

import FilterListIcon from '@mui/icons-material/FilterList';

import { TableFiltersProps } from "./types";

export const TableFilter = <T extends { id: number }>({ allFilters, filters, setFilters }: TableFiltersProps<T>) => {
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleChange = (event: SelectChangeEvent, key: keyof T) => {
        setFilters({ ...filters, [key]: (event.target.value as string) })
    }

    return (
        <>
            <Tooltip title="Filter list">
                <IconButton onClick={handleClick}>
                    <FilterListIcon />
                </IconButton>
            </Tooltip>
            <Popover
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <Box p={2} minWidth="320px">
                    <Typography align="left">
                        FILTERS
                    </Typography>
                    <Stack spacing={1} my={2}>
                        {
                            allFilters.map(filter => <FormControl
                                key={filter.key.toString()}
                                fullWidth
                            >
                                <InputLabel>{filter.name}</InputLabel>
                                <Select
                                    value={filters[filter.key] || "All"}
                                    label={filter.name}
                                    onChange={(e) => handleChange(e, filter.key)}
                                >
                                    <MenuItem value="All">
                                        <em>All</em>
                                    </MenuItem>
                                    {
                                        filter.options.map(option => <MenuItem
                                            key={option.id}
                                            value={option.id}
                                        >
                                            {option.name}
                                        </MenuItem>)
                                    }
                                </Select>
                            </FormControl>
                            )
                        }
                    </Stack>
                </Box>
            </Popover>
        </>
    );
}