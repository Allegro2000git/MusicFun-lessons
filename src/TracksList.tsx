import {Track} from "./Track.tsx";
import {useQuery} from "@tanstack/react-query";
import {client} from "./shared/api/client";
import {useSearchParams} from "react-router";
import {useEffect, useRef, useState} from "react";

export type LoopType = 'no-loop' | 'loop-playlist' | 'loop-active-song'

export function TracksList() {

    const [searchParams] = useSearchParams()

    const [currentPlayingTrack, setCurrentPlayingTrack] = useState<string | null>(null)
    const listRef = useRef<HTMLUListElement | null>(null)
    const [loopMode, setLoopMode] = useState<LoopType>('no-loop')

    const {data, isPending, isError} = useQuery({
        queryFn: async() => {
            const clientData = await client.GET("/playlists/tracks",
                {
                    params: {
                        query: {
                          pageSize: 3
                        }
                    }
                }
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

    const toggleLoopMode = () => {
        setLoopMode(prevState => {
            switch (prevState) {
                case "no-loop": return 'loop-playlist';
                case "loop-playlist": return "loop-active-song";
                case "loop-active-song": return "no-loop"
                default: return "no-loop"
            }
        })
    }

    if (isPending) {
        return <div>loading...</div>
    }

    if (isError) {
        return <span>Cant load track`s list</span>
    }

    const handleTrackEnded = (trackId: string) => {
        if (loopMode === "loop-active-song") return


        const trackEndedIndex = data.data.findIndex(el => el.id === trackId)

        if (trackEndedIndex !== -1) {
            if (trackEndedIndex < data.data.length - 1) {
                const nextTrack = data.data[trackEndedIndex + 1]
                setCurrentPlayingTrack(nextTrack!.id)
            } else {
                if (loopMode === "loop-playlist") {
                    const firstTrack = data.data[0]
                    setCurrentPlayingTrack(firstTrack!.id)
                } else {
                    setCurrentPlayingTrack(null)
                }
            }
        }
    }

    const handleTrackPlay = (trackId: string) => {
        setCurrentPlayingTrack(trackId)
    }

    return (
        <div>
            <div style={{ marginBottom: '20px' }}>
                <button
                    onClick={toggleLoopMode}
                    style={{
                        padding: '10px 20px',
                        border: '1px solid #ccc',
                        borderRadius: '5px',
                        backgroundColor:
                            loopMode === 'no-loop' ? '#fff' :
                                loopMode === 'loop-playlist' ? '#e6f7ff' : '#f0f8ff',
                        cursor: 'pointer'
                    }}
                >
                    {loopMode === 'no-loop' && 'No Loop'}
                    {loopMode === 'loop-playlist' && '🔁 Loop Playlist'}
                    {loopMode === 'loop-active-song' && '🔂 Loop One Track'}
                </button>
            </div>

            <ul ref={listRef}>
                Sort by {searchParams.get('sort')}
                {data.data.map(t => {
                    return <Track key={t.id}
                                  track={t}
                                  onTrackEnd={(trackId) => handleTrackEnded(trackId)}
                                  onTrackPlay={handleTrackPlay}
                                  isPlaying={currentPlayingTrack === t.id}
                                  loopMode={loopMode}
                    />;
                })
                }
            </ul>
        </div>
    )

}