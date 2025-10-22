import {TracksList} from "../widgets-layer/tracks-slice/ui-segment/TracksList";
import {useParams} from "react-router";
import {useMeQuery} from "../features-layer/auth-slice/model/useMeQuery";
import {UploadTrackForm} from "../features-layer/tracks-slice/upload-track-feature/ui-segment/UploadTrackForm";


export const ProfilePage = () => {
    const {userId} = useParams()
    const {data} = useMeQuery()

    const isProfileOwner =  data?.userId === userId

    return (
        <div>
            {isProfileOwner && <UploadTrackForm/>}
            <TracksList userId={userId} includeDrafts={isProfileOwner}/>
     </div>
 )
}