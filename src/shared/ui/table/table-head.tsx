import { IconButton, Toolbar, Tooltip, Typography } from "@mui/material";

import { TableFilter } from "./filter";

import { HeaderActionType, TableHeadProps } from "./types";

export const TableHead = <T extends { id: number }>({ title, headerActions, allFilters, filters, setFilters }: TableHeadProps<T>) => {
    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
            }}
        >
            <Typography
                sx={{ flex: '1 1 100%' }}
                variant="h6"
                id="tableTitle"
                component="div"
            >
                {title}
            </Typography>
            {
                headerActions.map((action: HeaderActionType, index: number) => <Tooltip
                    key={index}
                    title={action.tooltip}
                >
                    <IconButton onClick={action.onClick}>
                        {action.icon}
                        {action.label}
                    </IconButton>
                </Tooltip>)
            }
            {
                Boolean(allFilters) && <TableFilter
                    allFilters={allFilters}
                    filters={filters}
                    setFilters={setFilters}
                />
            }
        </Toolbar>
    )
}