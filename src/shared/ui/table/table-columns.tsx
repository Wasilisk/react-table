import { TableHead as MuiTableHead, TableCell, TableRow as MuiTableRow, TableSortLabel } from "@mui/material";

import { generateKey } from "shared/libs/generate-key";

import { ColumnType, TableColumnsProps } from "./types";

export const TableColumns = <T extends { id: number }>({ columns, hasActions, order, orderBy, onRequestSort }: TableColumnsProps<T>) => {

    const createSortHandler =
        (property: keyof T) => (event: React.MouseEvent<unknown>) => {
            onRequestSort(event, property);
        };

    return (
        <MuiTableHead>
            <MuiTableRow>
                {
                    columns.map((column: ColumnType<T>) => {
                        if (column.head.type === "sort") {
                            return (
                                <TableCell
                                    key={generateKey(column.head.name)}
                                >
                                    <TableSortLabel
                                        active={orderBy === column.body.key}
                                        direction={orderBy === column.body.key ? order : 'asc'}
                                        onClick={createSortHandler(column.body.key)}
                                    >
                                        {column.head.name}
                                    </TableSortLabel>
                                </TableCell>
                            )
                        }
                        else {
                            return (
                                <TableCell
                                    key={generateKey(column.head.name)}
                                >
                                    {column.head.name}
                                </TableCell>
                            )
                        }
                    })
                }
                {hasActions && <TableCell align="center">Actions</TableCell>}
            </MuiTableRow>
        </MuiTableHead>
    );
}