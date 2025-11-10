import { type ChangeEvent } from 'react';

type PageSizeSelectorProps = {
    pageSize: number;
    onPageSizeChange: (pageSize: number) => void;
    options?: number[];
};

export function PageSizeSelector({
                                     pageSize,
                                     onPageSizeChange,
                                     options = [5, 10, 20]
                                 }: PageSizeSelectorProps) {
    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        onPageSizeChange(Number(e.currentTarget.value));
    };

    return (
        <select value={pageSize} onChange={handleChange}>
            {options.map(option => (
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
        </select>
    );
}