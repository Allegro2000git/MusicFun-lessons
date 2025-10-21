import {useCallback, useRef} from "react";

type SearchMode = 'debounce' | 'throttle' | 'immediate'

type Props = {
    mode: SearchMode
    onSearch: (search: string) => void
}

export const useSearchStrategy = ({mode, onSearch}: Props) => {
    const timerIdRef = useRef<number>(undefined)
    const throttleIsWaitingRef = useRef<boolean>(false)

    const executeSearchMode = useCallback((search: string) => {
        switch (mode) {
            case 'immediate':
                onSearch(search);
                break;
            case 'debounce':
                clearTimeout(timerIdRef.current);
                timerIdRef.current = setTimeout(() => {
                    onSearch(search);
                }, 1000);
                break;
            case 'throttle':
                if (throttleIsWaitingRef.current) return;
                throttleIsWaitingRef.current = true;
                timerIdRef.current = setTimeout(() => {
                    onSearch(search);
                    throttleIsWaitingRef.current = false;
                }, 1000);
                break;
            default:
                onSearch(search);
        }
    }, [mode, onSearch]);

    const cleanup = useCallback(() => {
        clearTimeout(timerIdRef.current);
    }, []);

    return {
        executeSearchMode,
        cleanup
    };
};