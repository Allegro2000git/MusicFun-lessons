import type {SchemaTrackListItemResource} from "./shared/api/schema"
import {NavLink} from "react-router"
import {useEffect, useRef} from "react"
import type {LoopType} from "./TracksList";


type Props = {
    track: SchemaTrackListItemResource
    onTrackEnd: (trackId: string) => void
    onTrackPlay: (trackId: string) => void
    isPlaying: boolean
    loopMode: LoopType
};


export const Track = ({track, onTrackEnd, isPlaying, loopMode}: Props) => {
    const audioRef = useRef<HTMLAudioElement | null>(null)

    useEffect(() => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.play();
            } else {
                audioRef.current.pause();
            }
        }
    }, [isPlaying]);

    const handleTrackEnded = () => {
        onTrackEnd(track.id)
    }

    return (
            <li>
                <h4><NavLink to={"/tracks/" + track.id}>{track.attributes.title}</NavLink></h4>
                <audio
                    src={track.attributes.attachments[0]!.url}
                    controls={true} onEnded={handleTrackEnded}
                    ref={audioRef}
                    loop={loopMode === 'loop-active-song'}
                />
            </li>
    );
};