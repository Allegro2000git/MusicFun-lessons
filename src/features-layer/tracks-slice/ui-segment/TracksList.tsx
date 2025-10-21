import {Track} from "../../../Track.tsx";
import {useState} from "react";
import {useTracksQuery} from "../model-segment/useTracksQuery";
import {Pagination} from "../../../shared-layer/ui-segment/Pagination";
import {Search} from "../../../shared-layer/ui-segment/Search";
import {usePagination} from "../model-segment/usePagination";
import {useSorting} from "../model-segment/useSorting";
import {useTrackPlayback} from "../model-segment/useTrackPlayback";
import {PageSizeSelector} from "../../../shared-layer/ui-segment/PageSizeSelector";

export function TracksList() {
    const [search, setSearch] = useState("")
    const {pageNumber, setPageNumber, pageSize, setPageSize} = usePagination()
    const {sortBy, sortDirection, handleSortChange} = useSorting();

    const {data, isPending, isError} = useTracksQuery({pageNumber, pageSize, search, sortBy, sortDirection})

    const {
        currentPlayingTrack,
        listRef,
        handleTrackEnded,
        handleTrackPlay
    } = useTrackPlayback(data?.data);

    if (isPending) {
        return <div>loading...</div>
    }

    if (isError) {
        return <span>Cant load track`s list</span>
    }

    const handleSearchClick = (value: string) => {
        setSearch(value)
    }

    const handlePageSelect = (page: number) => setPageNumber(page)

    const isPageContentUnActual = data.meta.page !== pageNumber

    return (
        <>
            <Search onSearch={handleSearchClick} isSearchButtonVisibles={false} mode={'throttle'}/>
            <div>
                <span>Сортировка: </span>
                <button
                    onClick={() => handleSortChange('publishedAt')}
                    style={{
                        fontWeight: sortBy === 'publishedAt' ? 'bold' : 'normal',
                        margin: '0 5px'
                    }}
                >
                    По дате публикации {sortBy === 'publishedAt' && (sortDirection === 'asc' ? '↑' : '↓')}
                </button>
                <button
                    onClick={() => handleSortChange('likesCount')}
                    style={{
                        fontWeight: sortBy === 'likesCount' ? 'bold' : 'normal',
                        margin: '0 5px'
                    }}
                >
                    По лайкам {sortBy === 'likesCount' && (sortDirection === 'asc' ? '↑' : '↓')}
                </button>
            </div>
            <hr/>
            <PageSizeSelector
                pageSize={pageSize}
                onPageSizeChange={setPageSize}
            />
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