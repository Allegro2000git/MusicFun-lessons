import './App.css'
import {useState} from "react";
import {TracksList} from "./TracksList";
import {TrackDetail} from "./TrackDetail";

export function App() {
    const [selectedTrackId, setSelectedTrackId] = useState<string | null>(null)

  return (
      <>
          <h1>MusicFun</h1>
          <button onClick={() => {setSelectedTrackId(null)}}>Reset</button>
          <div style={{'display': 'flex', 'gap': '20px'}}>
              <TracksList selectedTrackId={selectedTrackId} onTrackSelect={(trackId) => {
                  setSelectedTrackId(trackId)
              }}/>
              <TrackDetail trackId={selectedTrackId}/>
          </div>
      </>
  )
}