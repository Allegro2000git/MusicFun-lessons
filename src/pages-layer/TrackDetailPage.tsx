import {TrackDetail} from "../TrackDetail";
import {useParams} from "react-router";

export const TrackDetailPage = () => {
    const {trackId} = useParams()

    return <div>
            <TrackDetail trackId={trackId!}/>
    </div>
}