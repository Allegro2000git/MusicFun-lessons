import { type ChangeEvent } from 'react';

type SearchInputProps = {
    value: string;
    onChange: (value: string) => void;
    error?: string;
    placeholder?: string;
};

export function SearchInput({ value, onChange, error, placeholder = 'Search...' }: SearchInputProps) {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        onChange(e.currentTarget.value);
    };

    return (
        <input
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
            style={{
                borderColor: error ? 'red' : '',
                backgroundColor: error ? '#fff0f0' : ''
            }}
            aria-invalid={!!error}
        />
    );
}