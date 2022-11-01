import { ReactNode } from "react"

export type ItemActionType<T> = {
    onClick: (args: T) => void,
    name?: string,
    icon?: ReactNode,
    component?: JSX.Element
}

export type SortType = { type?: "sort" }
export type FilterType = { type?: "filter", options: OptionsType[] }
type HeadTypes = SortType | FilterType

export type ColumnType<T> = {
    body: {
        key: keyof T,
        transform?: (arg: any) => void
    }
    head: HeadTypes & {
        name: string,
    }
}

export type OptionsType = {
    id: string,
    name: string
}

export type Order = 'asc' | 'desc';

export type HeaderActionType = {
    tooltip: string,
    onClick: () => void,
    icon?: ReactNode,
    label?: string
}

export type TableProps<T> = {
    title: string,
    headerActions: Array<HeaderActionType>,
    listData: T[],
    totalCount: number,
    itemActions: ItemActionType<T>[],
    columns: ColumnType<T>[],
    rowsPerPageOptions?: number[]
    itemsOnPage?: number
}

export type TableHeadProps<T> = Pick<TableProps<T>, "title" | "headerActions"> & {
    allFilters: DataFilter<T>[],
    filters: Record<keyof T, string>,
    setFilters: React.Dispatch<React.SetStateAction<Record<keyof T, string>>>
}

export type DataFilter<T> = {
    key: keyof T,
    name: string,
    options: OptionsType[]
}
export type TableRowsProps<T> = Pick<TableProps<T>, "listData" | "columns" | "itemActions">

export type TableColumnsProps<T> = Pick<TableProps<T>, "columns"> & {
    hasActions: boolean,
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof T) => void,
    order: Order,
    orderBy: keyof T
}

export type TableFiltersProps<T> = {
    allFilters: DataFilter<T>[],
    filters: Record<keyof T, string>,
    setFilters: React.Dispatch<React.SetStateAction<Record<keyof T, string>>>
}