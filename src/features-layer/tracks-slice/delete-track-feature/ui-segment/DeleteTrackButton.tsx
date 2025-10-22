import {useDeleteTrackMutation} from "../model-segment/useDeleteTrack";

type Props = {
    trackId: string
}

export const DeleteTrackButton = ({trackId}: Props) => {


    const {isPending, mutate} = useDeleteTrackMutation()

    const handleClick = () => {
        mutate(trackId)
    }

    return <button disabled={isPending} onClick={handleClick}>Delete</button>
}