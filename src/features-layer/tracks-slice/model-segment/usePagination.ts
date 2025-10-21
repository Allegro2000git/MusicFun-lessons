import {useState} from "react";

export function usePagination() {
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(5);

    const handlePageSizeChange = (newPageSize: number) => {
        setPageSize(newPageSize);
        setPageNumber(1);
    };

    return {
        pageNumber,
        pageSize,
        setPageNumber,
        setPageSize: handlePageSizeChange
    };
}