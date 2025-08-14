import './App.css'
import {useEffect, useState} from "react";
import type {TrackDataItem, TracksResponse} from "./types/types";

export function App() {
    const [tracks, setTracks] = useState<TrackDataItem[]>([])



    useEffect(() => {
        fetch('https://musicfun.it-incubator.app/api/1.0/playlists/tracks', {
            headers: {
                'API-KEY': "8b90cddd-f776-4a2a-9095-25f652e76b49"
            }
        })
            .then(res => res.json() as Promise<TracksResponse>)
            .then(json => {
                console.log(json)
                setTracks(json.data)
            })
    }, [])

  return (
    <ul>
        {tracks.map((track) => {
            return (
                <li>
                    <h4>{track.attributes.title}</h4>
                    <audio src={track.attributes.attachments[0].url} controls={true}/>
                </li>
            )
        })}
    </ul>
  )
}
