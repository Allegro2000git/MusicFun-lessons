import {Track} from "./Track";
import {useEffect, useState} from "react";
import type {TrackDataItem} from "./types/types";
import {api} from "./api";

type Props = {
    onTrackSelect: (trackId: string) => void
    selectedTrackId: string | null
}

export const TracksList = ({onTrackSelect, selectedTrackId}: Props) => {
    const [listQueryStatus, setListQueryStatus] = useState<'success' | 'loading' | 'pending'>('loading')
    const [tracks, setTracks] = useState<TrackDataItem[] | null>(null)

    useEffect( () => {
        api.getTracks()
            .then(json => {
                setTracks(json.data)
                setListQueryStatus('success')
            })
    }, [])

 if (listQueryStatus === "loading") {
     return <div>Loading...</div>
 }

 const handleSelect = (trackId: string) => {
     onTrackSelect(trackId)
 }

    return (
        <ul>
            <h2>List</h2>
            {tracks?.map((t) => <Track onSelect={handleSelect} track={t} isSelected={selectedTrackId === t.id}/>)}
        </ul>
    );
};