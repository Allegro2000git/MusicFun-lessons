import {Track} from "./Track.tsx";
import {useQuery} from "@tanstack/react-query";
import {client} from "./shared/api/client";

type Props = {
    onTrackSelect: (trackId: string) => void
    selectedTrackId: string | null,
}

export function TracksList({onTrackSelect, selectedTrackId}: Props) {

    const {data, isPending, isError} = useQuery({
        queryFn: async() => {
            const clientData = await client.GET("/playlists/tracks")
            return clientData.data!
        },
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