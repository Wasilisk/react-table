import { Table as MuiTable, TableHead as MuiTableHead, IconButton, TableCell, TableContainer, TableRow as MuiTableRow, TableSortLabel, Toolbar, Tooltip, Typography, Button } from "@mui/material";
import { isValidElement, ReactElement, ReactNode } from "react";
import { generateKey } from "./shared/libs/generate-key";

type ItemActionType<T> = {
    onClick: (args: T) => void,
    name?: string,
    icon?: ReactNode,
}

type ColumnType<T> = {
    body: {
        key: keyof T,
        transform?: (arg: any) => void
    }
    head: {
        name: string,
        type?: string,
    }
}

type TableProps<T> = TableHeadProps & {
    listData: T[],
    totalCount: number,
    itemActions: ItemActionType<T>[]
    columns: ColumnType<T>[]
}

export const Table = <T extends unknown>({ title, listData, headerActions, itemActions, columns }: TableProps<T>) => {
    return (
        <TableContainer>
            <TableHead title={title} headerActions={headerActions} />
            <MuiTable>
                <TableColumns columns={columns} hasActions={Boolean(itemActions)} />
                <TableRows listData={listData} columns={columns} itemActions={itemActions} />
            </MuiTable>
        </TableContainer>
    );
}

const TableColumns = <T extends unknown>({ columns, hasActions }: any) => {
    return (
        <MuiTableHead>
            <MuiTableRow>
                {
                    columns.map((column: ColumnType<T>) => <TableCell key={generateKey(column.head.name)}>{column.head.name}</TableCell>)
                }
                {hasActions && <TableCell>Actions</TableCell>}
            </MuiTableRow>
        </MuiTableHead>
    );
}

const TableRows = <T extends { id: number }>({ listData, columns, itemActions }: any) => {
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
                    {
                        itemActions && itemActions.map((action: ItemActionType<T>) => <TableCell
                            key={generateKey("action. as string")}
                        >
                            {
                                action.name && action.icon && <Button onClick={() => action.onClick(data)}>
                                    {action.icon}
                                    {action.name}
                                </Button>
                            }
                            {
                                action.name && !action.icon && <Button onClick={() => action.onClick(data)}>
                                    {action.name}
                                </Button>
                            }
                            {
                                !action.name && action.icon &&
                                <IconButton onClick={() => action.onClick(data)}>
                                    {action.icon}
                                </IconButton>
                            }
                        </TableCell>)
                    }
                </MuiTableRow>
                )
            }
        </MuiTableHead>
    );
}

type TableHeadProps = {
    title: string | JSX.Element,
    headerActions: Array<HeaderActionType>
}

type HeaderActionType = {
    tooltip: string,
    onClick: () => void,
    icon?: ReactNode,
    label?: string
}

const TableHead = ({ title, headerActions }: TableHeadProps) => {
    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
            }}
        >
            <>
                {
                    isValidElement(title)
                        ? title
                        : <Typography
                            sx={{ flex: '1 1 100%' }}
                            variant="h6"
                            id="tableTitle"
                            component="div"
                        >
                            {title}
                        </Typography>
                }
            </>
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
        </Toolbar>
    )
}