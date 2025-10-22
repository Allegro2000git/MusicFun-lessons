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

    const handleSearchClick = () => {
        onSearch(search)
    }

    useEffect(() => {
        if (!isSearchButtonVisibles) {
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
        setSearch(value)
        searchValueRef.current = value
    }

    return (
        <>
            <input value={search} onChange={handleSearchChange} placeholder={"search..."}/>
            {isSearchButtonVisibles && <button onClick={handleSearchClick}>Search</button>}
        </>

    )
}