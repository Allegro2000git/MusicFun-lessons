import type {TrackResponse} from "./types/types";
import {useQuery} from "./hooks/utils/useQuery";
import {api} from "./api";

type Props = {
    trackId: string | null
}

function useTrackDetail(trackId: string | null) {
    const { status: detailQueryStatus,
            data: track,
            } = useQuery<TrackResponse>({
                    queryStatusDefault: 'pending',
                    queryKey: ['track', trackId],
                    skip: !trackId,
                    enabled: !!trackId,
                    queryFn: async () => {
                        return await api.getTrack(trackId!)
                    }
                })

    return {detailQueryStatus,track}
}

export const TrackDetail = ({trackId}: Props) => {
    const {detailQueryStatus, track} = useTrackDetail(trackId)

    if (detailQueryStatus === 'pending') {
        return <span>Not track for display</span>
    }

    if (detailQueryStatus === 'loading') {
        return <div>Loading...</div>
    }

    return (
        <div>
            <h2>Detail</h2>

                <h3>{track?.data.attributes.title}</h3>
                <div>{new Date(track?.data.attributes.addedAt).toLocaleString()}</div>
                <div>likes: {track?.data.attributes.likesCount}</div>
                <div>lyrics: {track?.data.attributes.lyrics}</div>
        </div>
    );
};