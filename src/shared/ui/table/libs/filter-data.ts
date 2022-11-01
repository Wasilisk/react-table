export const filterData = <T extends { [key: string]: any }>(data: T[], filters: Record<keyof T, string>): T[] => {
    let filteredData = [...data];

    for (const [key, value] of Object.entries(filters)) {
        if (value === "All") continue;

        filteredData = filteredData.filter(data => data[key] === value)
    }

    return filteredData;
}