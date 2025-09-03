import type {TrackDataItem} from "./types/types";

type Props = {
    track: TrackDataItem
    isSelected: boolean
    onSelect: (trackId: string) => void
};


export const Track = ({track, isSelected, onSelect}: Props) => {

    const color =  isSelected? 'red' : 'black'

    return (
            <li style={{color}}>
                <h4 onClick={() =>{onSelect(track.id)}}>{track.attributes.title}</h4>
                <audio src={track.attributes.attachments[0].url} controls={true}/>
            </li>
    );
};