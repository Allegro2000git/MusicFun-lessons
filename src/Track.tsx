import type {SchemaTrackListItemResource} from "./shared-layer/api-segment/schema";
import {NavLink} from "react-router";
import {useEffect, useRef} from "react";


type Props = {
    track: SchemaTrackListItemResource
    onTrackEnd: (trackId: string) => void
    onTrackPlay: (trackId: string) => void
    isPlaying: boolean
};


export const Track = ({track, onTrackEnd, isPlaying}: Props) => {
    const audioRef = useRef<HTMLAudioElement | null>(null)

    useEffect(() => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.play();
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
                    ref={audioRef}/>
            </li>
    );
};