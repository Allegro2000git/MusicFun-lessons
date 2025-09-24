import {Track} from "./Track";
import type {TrackDataItem} from "./types/types";
import {api} from "./api";
import {useQuery} from "./hooks/utils/useQuery";

type Props = {
    onTrackSelect: (trackId: string) => void
    selectedTrackId: string | null
}

function useTracksList (onTrackSelect: (trackId: string) => void) {
    const { status: listQueryStatus,
            data: tracks
            } = useQuery<TrackDataItem[]>(
                { queryStatusDefault: 'loading',
                  queryKey: [],
                    queryFn: async () => {
                        return await api.getTracks()
                            .then(json => json.data)
                    }
                })

    const handleSelect = (trackId: string) => {
        onTrackSelect(trackId)
    }
    return {
        listQueryStatus, tracks, handleSelect
    }
}

export const TracksList = ({onTrackSelect, selectedTrackId}: Props) => {

    const {listQueryStatus, tracks, handleSelect} = useTracksList(onTrackSelect)

 if (listQueryStatus === "loading") {
     return <div>Loading...</div>
 }

    return (
        <ul>
            <h2>List</h2>
            {tracks?.map(t => <Track onSelect={handleSelect} track={t} isSelected={selectedTrackId === t.id}/>)}
        </ul>
    );
};