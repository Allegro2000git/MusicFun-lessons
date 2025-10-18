import {useContext, useEffect, useRef, useState} from "react";
import type {Entry, QueryFnParams, QueryKey} from "./query-client";


import {QueryClientContext} from "./QueryClientContext";

type QueryStatus = 'success' | 'loading' | 'pending'

type Options<T> = {
    queryStatusDefault?: QueryStatus,
    queryKey: QueryKey
    skip?: boolean
    enabled?: boolean
    queryFn: (params: QueryFnParams) => Promise<T>
}

export function useQuery<T>(params: Options<T>) {
    const {queryFn, queryKey, enabled = true} = params

    if (!queryKey) {
        throw new Error('queryKey is required')
    }

    const queryClient = useContext(QueryClientContext)
    if (!queryClient) throw new Error("queryClient nust be inside context")

    const initEntry = queryClient.initEntry(queryKey, enabled)

    const [entry, setEntry] = useState<Entry>(initEntry)

    useEffect(() => {
        setEntry(initEntry)
    }, [initEntry]);

    const abortControllerRef = useRef<AbortController>(null)

    useEffect(() => {
        abortControllerRef.current?.abort('Abort because new request')

        if (!enabled) {
            return
        }

        abortControllerRef.current = new AbortController()

        const subscriber = () => {
            setEntry({...queryClient.get(queryKey)})
        }

        let unsubscribe: () => void

        queryClient.fetch(queryFn, queryKey, abortControllerRef.current.signal).then((e) => {
            unsubscribe = queryClient.subscribe(queryKey, subscriber)
            setEntry({...e})
        })

        return () => {
            unsubscribe?.()
        }
    }, queryKey)

    return {
        data: entry?.data,
        status: entry?.status ?? 'loading'
    }
}