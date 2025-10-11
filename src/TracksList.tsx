import {Track} from "./Track.tsx";
import {useQuery} from "@tanstack/react-query";
import {client} from "./shared/api/client";

export function TracksList() {

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

    return <ul>
        {data.data.map(t => {
            return <Track key={t.id}
                          track={t}
            />;
        })
        }
    </ul>;
}