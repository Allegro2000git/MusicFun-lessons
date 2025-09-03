import {useEffect, useRef, useState} from "react";
import type {TrackResponse} from "./types/types";
import {api} from "./api";

type Props = {
    trackId: string | null
}

export const TrackDetail = ({trackId}: Props) => {
    const [detailQueryStatus, setDetailQueryStatus] = useState<'pending' | 'success' | 'loading'>('pending')
    const [track, setTrack] = useState<TrackResponse | null>(null)

    const abortControllerRef= useRef<AbortController | null>(null)

    useEffect(() => {
        abortControllerRef.current?.abort()
        if (!trackId) {
            setTrack(null)
            setDetailQueryStatus('pending')
            return
        }

        abortControllerRef.current = new AbortController()

        setDetailQueryStatus('loading')

        api.getTrack(trackId, abortControllerRef.current.signal)
            .then(json => {
                setTrack(json)
                setDetailQueryStatus('success')
            })
    }, [trackId]);

    if (detailQueryStatus === 'pending') {
        return <span>Not track for display</span>
    }

    if (detailQueryStatus === 'loading') {
        return <div>Loading...</div>
    }

    return (
        <div>
            <h2>Detail</h2>

                <h3>{track?.data.attributes.title}</h3>
                <div>{new Date(track?.data.attributes.addedAt).toLocaleString()}</div>
                <div>likes: {track?.data.attributes.likesCount}</div>
                <div>lyrics: {track?.data.attributes.lyrics}</div>
        </div>
    );
};