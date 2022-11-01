import { TableHead as MuiTableHead, TableCell, TableRow as MuiTableRow, Button, Stack } from "@mui/material";

import { cloneElement } from "react";

import { generateKey } from "shared/libs/generate-key";

import { ColumnType, ItemActionType, TableRowsProps } from "./types";

export const TableRows = <T extends { id: number }>({ listData, columns, itemActions }: TableRowsProps<T>) => {
    return (
        <MuiTableHead>
            {
                listData.map((data: T) => <MuiTableRow key={data.id}>
                    {
                        columns.map((column: ColumnType<T>) => <TableCell
                            key={generateKey(column.body.key as string)}
                        >
                            {
                                column.body.transform
                                    ? column.body.transform((data as any)[column.body.key])
                                    : (data as any)[column.body.key]
                            }
                        </TableCell>)
                    }
                    <TableCell
                        align="center"
                        sx={{ display: "flex", justifyContent: "center" }}
                    >
                        <Stack
                            direction="row"
                            spacing={1}
                        >
                            {
                                itemActions && itemActions.map((action: ItemActionType<T>) => <>
                                    {
                                        action.component
                                            ? cloneElement(action.component, { onClick: () => action.onClick(data) })
                                            : <Button variant="contained" onClick={() => action.onClick(data)}>
                                                {action.icon}
                                                {action.name}
                                            </Button>
                                    }
                                </>
                                )
                            }
                        </Stack>
                    </TableCell>
                </MuiTableRow>
                )
            }
        </MuiTableHead>
    );
}
