import { useState, useRef, useEffect } from 'react';
import type {SchemaTrackListItemResource} from "../../../shared-layer/api-segment/schema";

export function useTrackPlayback(tracks: SchemaTrackListItemResource[] | undefined) {
    const [currentPlayingTrack, setCurrentPlayingTrack] = useState<string | null>(null);
    const listRef = useRef<HTMLUListElement | null>(null);

    useEffect(() => {
        function scrollToTrack(trackId: string) {
            const listNode = listRef.current;
            if (!listNode || !tracks) return;

            const trackIndex = tracks.findIndex(track => track.id === trackId);
            if (trackIndex === -1) return;

            const trackNodes = listNode.querySelectorAll('li');
            if (trackNodes[trackIndex]) {
                trackNodes[trackIndex].scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest',
                    inline: 'center'
                });
            }
        }

        if (currentPlayingTrack) {
            scrollToTrack(currentPlayingTrack);
        }
    }, [currentPlayingTrack, tracks]);

    const handleTrackEnded = (trackId: string) => {
        if (!tracks) return;

        const trackEndedIndex = tracks.findIndex(track => track.id === trackId);
        if (trackEndedIndex !== -1 && trackEndedIndex < tracks.length - 1) {
            const nextTrack = tracks[trackEndedIndex + 1];
            setCurrentPlayingTrack(nextTrack!.id);
        }
    };

    const handleTrackPlay = (trackId: string) => {
        setCurrentPlayingTrack(trackId);
    };

    return {
        currentPlayingTrack,
        listRef,
        handleTrackEnded,
        handleTrackPlay
    };
}
