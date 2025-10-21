import {useEffect, useState} from "react";
import {useSearchValidation} from "../../features-layer/tracks-slice/model-segment/useSearchValidation";
import {useSearchStrategy} from "../../features-layer/tracks-slice/model-segment/useSearchStrategy";
import {SearchInput} from "./SearchInput";

type Props = {
    onSearch: (search: string) => void
    isSearchButtonVisibles?: boolean
    mode?: 'debounce' | 'throttle' | 'immediate'
};

export function Search({onSearch, isSearchButtonVisibles = true, mode = 'immediate'}: Props) {
    const [search, setSearch] = useState('')
    const {error, validateSearch} = useSearchValidation()
    const {executeSearchMode, cleanup} = useSearchStrategy({mode, onSearch})

    useEffect(() => {
        if (!isSearchButtonVisibles) {
            if (!validateSearch(search)) {
                return
            }
            executeSearchMode(search);
        }
    }, [search, isSearchButtonVisibles, executeSearchMode, validateSearch])

    useEffect(() => {
        return cleanup
    }, [cleanup])

    const handleSearchChange = (value: string) => {
        validateSearch(value)
        setSearch(value)
    }

    const handleSearchClick = () => {
        if (validateSearch(search)) {
            onSearch(search)
        }
    }

    return (
        <>
            <SearchInput value={search} onChange={handleSearchChange} error={error}/>
            {isSearchButtonVisibles && <button onClick={handleSearchClick} disabled={!!error && search !== ''}>Search</button>}
            {error && <div style={{color: 'red', fontSize: '12px', marginTop: '4px'}}>{error}</div>}
        </>

    )
}