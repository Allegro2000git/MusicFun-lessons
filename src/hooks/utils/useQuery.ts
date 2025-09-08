import {useEffect, useRef, useState} from "react";

type QueryStatus = 'success' | 'loading' | 'pending'

type Options<T> = {
    queryStatusDefault?: QueryStatus,
    queryKeys: string[],
    skip?: boolean
    queryFn: () => Promise<T>
}

export function useQuery<T>(params: Options<T>) {
    const [queryStatus, setQueryStatus] = useState<QueryStatus>(params.queryStatusDefault ?? "loading")
    const [data, setData] = useState<T | null>(null)

    const abortControllerRef= useRef<AbortController | null>(null)

    useEffect(() => {
        if (params.skip) return
        abortControllerRef.current?.abort()

 /*       if (!trackId) {
            setTrack(null)
            setDetailQueryStatus('pending')
            return
        }*/

        abortControllerRef.current = new AbortController()

        setQueryStatus('loading')


        params.queryFn().then(json => {
            setData(json)
            setQueryStatus('success')
        })
    }, params.queryKeys);

    return {status: queryStatus, data}
};