import {api} from "./api.ts";
import {useQuery, keepPreviousData} from "@tanstack/react-query";

type Props = {
    trackId: string | null
}

export function TrackDetail({trackId}: Props) {
    const {data, isPending, isError, isFetching} = useQuery({
        queryFn: ({signal}) => {
            return api.getTrack(trackId!, signal);
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
        <div>{data.data.attributes.addedAt}</div>
        <div>likes: {data.data.attributes.likesCount}</div>
        <div>lyrics: {data.data.attributes.lyrics}</div>
    </div>
}