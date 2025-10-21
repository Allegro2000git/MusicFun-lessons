import { useSearchParams } from "react-router";

export function useSorting() {
    const [searchParams, setSearchParams] = useSearchParams();

    const sortBy = searchParams.get('sortBy') || 'publishedAt';
    const sortDirection = searchParams.get('sortDirection') || 'desc';

    const handleSortChange = (newSortBy: string) => {
        let newSortDirection = 'desc';

        if (sortBy === newSortBy) {
            newSortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
        }

        setSearchParams(prev => {
            const newParams = new URLSearchParams(prev);
            newParams.set('sortBy', newSortBy);
            newParams.set('sortDirection', newSortDirection);
            return newParams;
        });
    };

    return {
        sortBy,
        sortDirection,
        handleSortChange
    };
}