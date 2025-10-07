import {Track} from "./Track.tsx";
import {api} from "./api.ts";
import {useQuery} from "@tanstack/react-query";

type Props = {
    onTrackSelect: (trackId: string) => void
    selectedTrackId: string | null,
}

export function TracksList({onTrackSelect, selectedTrackId}: Props) {

    const {data, isPending, isError} = useQuery({
        queryFn: () => api.getTracks(),
        queryKey: ['tracks']
    })

    if (isPending) {
        return <div>loading...</div>
    }

    if (isError) {
        return <span>Cant load track`s list</span>
    }

    const handleSelect = (trackId: string) => {
        onTrackSelect(trackId)
    }

    return <ul>
        {data.data.map(t => {
            return <Track key={t.id}
                          onSelect={ handleSelect }
                          isSelected={t.id === selectedTrackId}
                          track={t}
            />;
        })
        }
    </ul>;
}