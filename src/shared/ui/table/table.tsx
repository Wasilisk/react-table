import { TableContainer, Table as MuiTable, TablePagination } from "@mui/material";

import { useState } from "react";

import { stableSort } from "shared/libs/stable-sort";

import { filterData, getComparator, getFiltersFromData } from "./libs";

import { TableColumns } from "./table-columns";
import { TableHead } from "./table-head";
import { TableRows } from "./table-rows";

import { Order, TableProps } from "./types";


export const Table = <T extends { id: number }>({
    title,
    listData,
    headerActions,
    itemActions,
    columns,
    totalCount,
    rowsPerPageOptions,
    itemsOnPage = 10
}: TableProps<T>) => {
    const [order, setOrder] = useState<Order>('desc');
    const [orderBy, setOrderBy] = useState<keyof T>("id");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(itemsOnPage);
    const [filters, setFilters] = useState({} as Record<keyof T, string>)

    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: keyof T,
    ) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const filteredData = filterData(listData, filters);
    const sortedData = stableSort(filteredData, getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <TableContainer>
            <TableHead
                title={title}
                headerActions={headerActions}
                allFilters={getFiltersFromData(columns)}
                filters={filters}
                setFilters={setFilters}
            />
            <MuiTable>
                <TableColumns
                    columns={columns}
                    hasActions={Boolean(itemActions)}
                    onRequestSort={handleRequestSort}
                    order={order}
                    orderBy={orderBy}
                />
                <TableRows
                    listData={sortedData}
                    columns={columns}
                    itemActions={itemActions}
                />
            </MuiTable>
            {
                rowsPerPageOptions && <TablePagination
                    rowsPerPageOptions={rowsPerPageOptions}
                    component="div"
                    count={totalCount}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            }
        </TableContainer>
    );
}