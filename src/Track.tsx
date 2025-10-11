import type {SchemaTrackListItemResource} from "./shared/api/schema";
import {NavLink} from "./shared/libs/router/Route";


type Props = {
    track: SchemaTrackListItemResource
};


export const Track = ({track}: Props) => {

    return (
            <li>
                <h4><NavLink to={"/tracks/" + track.id}>{track.attributes.title}</NavLink></h4>
                <audio src={track.attributes.attachments[0]!.url} controls={true}/>
            </li>
    );
};