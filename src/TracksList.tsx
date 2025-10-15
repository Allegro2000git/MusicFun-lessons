import {Track} from "./Track.tsx";
import {useQuery} from "@tanstack/react-query";
import {client} from "./shared/api/client";
import {useSearchParams} from "react-router";
import {useEffect, useRef, useState} from "react";

export function TracksList() {

    const [searchParams] = useSearchParams()

    const [currentPlayingTrack, setCurrentPlayingTrack] = useState<string | null>(null)
    const listRef = useRef<HTMLUListElement | null>(null);

    const {data, isPending, isError} = useQuery({
        queryFn: async() => {
            const clientData = await client.GET("/playlists/tracks",
                /*         {
                          params: {
                              query: {
                                  pageSize: 3
                              }
                          } // для отображения на стр только 3 треков

                  }*/
            )
            return clientData.data!
        },
        queryKey: ['tracks']
    })

    useEffect(() => {
        function scrollToTrack(trackId: string) {
            const listNode = listRef.current;
            if (!listNode || !data?.data) return;

            const trackIndex = data.data.findIndex(track => track.id === trackId);
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
    }, [currentPlayingTrack, data?.data])


    if (isPending) {
        return <div>loading...</div>
    }

    if (isError) {
        return <span>Cant load track`s list</span>
    }

    const handleTrackEnded = (trackId: string) => {
        const trackEndedIndex = data.data.findIndex(el => el.id === trackId)

        if (trackEndedIndex !== -1) {
            if (trackEndedIndex < data.data.length - 1) {
                const nextTrack = data.data[trackEndedIndex + 1]
                setCurrentPlayingTrack(nextTrack!.id)
            }
        }
    }

    const handleTrackPlay = (trackId: string) => {
        setCurrentPlayingTrack(trackId)
    }

    return <ul ref={listRef}>
        Sort by {searchParams.get('sort')}
        {data.data.map(t => {
            return <Track key={t.id}
                          track={t}
                          onTrackEnd={(trackId) => handleTrackEnded(trackId)}
                          onTrackPlay={handleTrackPlay}
                          isPlaying={currentPlayingTrack === t.id}
            />;
        })
        }
    </ul>;
}