import { useState, useCallback } from 'react';

export function useSearchValidation() {
    const [error, setError] = useState('');

    const validateSearch = useCallback((value: string): boolean => {
        if (value === '') {
            setError('');
            return true;
        }

        const isValid = /^[a-zA-Zа-яА-ЯёЁ0-9_\s]*$/.test(value);

        if (!isValid) {
            setError('Допустимы только буквы (английские и русские), цифры, пробел и знак подчеркивания');
            return false;
        }

        setError('');
        return true;
    }, []);

    return {
        error,
        validateSearch,
        setError
    };
}