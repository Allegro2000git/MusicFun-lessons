import {type ChangeEvent, useEffect, useRef, useState} from "react";

type Props = {
    onSearch: (search: string) => void
    isSearchButtonVisibles?: boolean
    mode?: 'debounce' | 'throttle' | 'immediate'
};

export function Search({onSearch, isSearchButtonVisibles = true, mode = 'immediate'}: Props) {
    const [search, setSearch] = useState('')
    const timerIdRef = useRef<number>(undefined)
    const throttleIsWaitingRef = useRef<boolean>(false)
    const searchValueRef = useRef<string>('')
    const [error, setError] = useState('')

    const validateSearch = (value: string): boolean => {
        if (value === '') {
            setError('')
            return true
        }
        const isValid = /^[a-zA-Zа-яА-ЯёЁ0-9_\s]*$/.test(value)

        if (!isValid) {
            setError('Допустимы только буквы (английские и русские), цифры, пробел и знак подчеркивания')
            return false
        }
        return isValid
    }

    const handleSearchClick = () => {
        if (validateSearch(search)) {
            onSearch(search)
        }
    }

    useEffect(() => {
        if (!isSearchButtonVisibles) {
            if (!validateSearch(search)) {
                return
            }

            switch (mode) {
                case 'immediate':
                    onSearch(search)
                    break
                case 'debounce':
                    clearTimeout(timerIdRef.current)
                    timerIdRef.current = setTimeout(() => {
                        onSearch(search)
                    },1000)
                    break
                case  'throttle':
                    if (throttleIsWaitingRef.current) return
                    timerIdRef.current = setTimeout(() => {
                        onSearch(searchValueRef.current)
                        throttleIsWaitingRef.current = false
                    },1000)
                    throttleIsWaitingRef.current = true
                    break
                default: {
                    onSearch(search)
                }
            }
        }
    }, [search, mode, isSearchButtonVisibles, onSearch])

    useEffect(() => {
        return () => {
            clearTimeout(timerIdRef.current)
        }
    }, [])

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value
        validateSearch(value)
        setSearch(value)
        searchValueRef.current = value
    }

    return (
        <>
            <input value={search}
                   onChange={handleSearchChange}
                   style={{borderColor: error ? 'red' : '', backgroundColor: error ? '#fff0f0' : ''}}
                   aria-invalid={!!error}
                   />
            {isSearchButtonVisibles && <button onClick={handleSearchClick} disabled={!!error && search !== ''}>Search</button>}
            {error && <div style={{color: 'red', fontSize: '12px', marginTop: '4px'}}>{error}</div>}
        </>

    )
}