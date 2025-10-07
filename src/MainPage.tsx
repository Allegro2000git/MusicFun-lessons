import {useState} from "react";
import {TracksList} from "./TracksList";
import {TrackDetail} from "./TrackDetail";

export function MainPage() {
    const [selectedTrackId, setSelectedTrackId] = useState<string | null>(null)
    const [isDublicationDetailVisible, setIsDublicationDetailVisible] = useState(false)

    return (
        <>
            <h1>MusicFun</h1>
            <button onClick={() => setSelectedTrackId(null)}>Reset</button>
            <button onClick={() => setIsDublicationDetailVisible(!isDublicationDetailVisible)}>Toggle</button>
            <div style={{'display': 'flex', 'gap': '20px'}}>
                <TracksList selectedTrackId={selectedTrackId} onTrackSelect={(trackId) => {
                    setSelectedTrackId(trackId)
                }}/>
                <TrackDetail trackId={selectedTrackId}/>
                {isDublicationDetailVisible && <TrackDetail trackId={selectedTrackId}/>}
            </div>
        </>
    )
}