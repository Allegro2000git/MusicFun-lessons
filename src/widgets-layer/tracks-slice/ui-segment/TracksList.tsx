import {Track} from "../../../Track.tsx";
import {type ChangeEvent, useEffect, useRef, useState} from "react";
import {useTracksQuery} from "../model-segment/useTracksQuery";
import {Pagination} from "../../../shared-layer/ui-segment/Pagination";
import {Search} from "../../../shared-layer/ui-segment/Search";

function usePagination () {
    const [pageNumber, setPageNumber] = useState(1)
    const [pageSize, setPageSize] = useState(5)

    return {
        pageNumber,
        setPageNumber,
        pageSize,
        setPageSize: (newPageSize: number) => {
            setPageSize(newPageSize)
            setPageNumber(1)
        }
    }
}

type Props = {
    userId?: string
    includeDrafts?: boolean
}

export function TracksList({userId, includeDrafts}: Props) {
    const [currentPlayingTrack, setCurrentPlayingTrack] = useState<string | null>(null)
    const listRef = useRef<HTMLUListElement | null>(null)
    const [search, setSearch] = useState("")
    const {pageNumber, setPageNumber, pageSize, setPageSize} = usePagination()

    const {data, isPending, isError} = useTracksQuery({pageNumber, pageSize, search, userId, includeDrafts})

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

    const handlePageSelect = (page: number) => setPageNumber(page)

    const isPageContentUnActual = data.meta.page !== pageNumber

    const handlePageSizeChange = (e: ChangeEvent<HTMLSelectElement>) => {
       setPageSize(Number(e.currentTarget.value))
       setPageNumber(1)
    }

    const handleSearchClick = (value: string) => {
        setSearch(value)
    }

    return (
        <>
            <Search onSearch={handleSearchClick} isSearchButtonVisibles={false} mode={'throttle'}/>

            <hr/>
            <select defaultValue={pageSize} onChange={handlePageSizeChange}>
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
            </select>
            <Pagination total={data.meta.totalCount!} skip={data.meta.pageSize * (pageNumber - 1)}
                        limit={data.meta.pageSize} onPageSelect={handlePageSelect}/>
            <ul ref={listRef} style={{opacity: isPageContentUnActual ? '0.4' : '1'}}>
                {data.data.map(t => {
                    return <Track
                                key={t.id}
                                track={t}
                                onTrackEnd={(trackId) => handleTrackEnded(trackId)}
                                onTrackPlay={handleTrackPlay}
                                isPlaying={currentPlayingTrack === t.id}
                    />
                })
                }
            </ul>
        </>
        )
}