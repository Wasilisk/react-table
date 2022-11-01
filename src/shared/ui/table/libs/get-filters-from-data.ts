import { ColumnType, DataFilter, FilterType } from "../types";

export const getFiltersFromData = <T extends any>(data: ColumnType<T>[]): DataFilter<T>[] =>
    data.filter(column => column.head.type === "filter")
        .map(column => ({
            key: column.body.key,
            name: column.head.name,
            options: (column.head as FilterType).options
        }))