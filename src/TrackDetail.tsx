import {useQuery, keepPreviousData} from "@tanstack/react-query";
import {client} from "./shared-layer/api-segment/client";
import {useParams} from "react-router";

export function TrackDetail() {

    const {trackId} = useParams();

    const {data, isPending, isError, isFetching} = useQuery({
        queryFn: async ({signal}) => {
             const clientData = await client.GET('/playlists/tracks/{trackId}', {
                 params: {
                     path: {
                         trackId: trackId!
                     }
                 },
                 signal
             });
            return clientData.data!
        },
        enabled: Boolean(trackId),
        queryKey: ['track', trackId],
        placeholderData: keepPreviousData
    })

    if (!trackId) {
        return <div>no track selected...</div>
    }

    if (isPending){
       return <div>Loading...</div>
    }
    if (isError) {
        return <span>Some error when fetch track</span>
    }

    return  <div>
        <h2>{isFetching && "⏳"} Detail</h2>

        <h3>{data.data.attributes.title}</h3>
        <div>{new Date(data.data.attributes.addedAt).toLocaleString()}</div>
        <div>likes: {data.data.attributes.likesCount}</div>
        <div>lyrics: {data.data.attributes.lyrics}</div>
    </div>
}