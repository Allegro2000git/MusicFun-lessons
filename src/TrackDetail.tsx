import {useQuery, keepPreviousData} from "@tanstack/react-query";
import {client} from "./shared-layer/api-segment/client";

type Props = {
    trackId: string
}

export function TrackDetail({trackId}: Props) {

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
        <div>{data.data.attributes.publishedAt && new Date(data.data.attributes.publishedAt).toLocaleString()}</div>
        <div>likes: {data.data.attributes.likesCount}</div>
        <div>lyrics: {data.data.attributes.lyrics}</div>
    </div>
}