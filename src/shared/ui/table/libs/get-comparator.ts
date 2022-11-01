import { Order } from "../types";

import { descendingComparator } from "./descending-comparator";

export const getComparator = <Key extends keyof any>(
    order: Order,
    orderBy: Key,
): (
    a: any,
    b: any,
) => number => {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}