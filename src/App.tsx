import './App.css'
import {useEffect, useRef, useState} from "react";
import type {TrackDataItem, TrackResponse, TracksResponse} from "./types/types";

export function App() {
    const [listQueryStatus, setListQueryStatus] = useState<'success' | 'loading'>('loading')
    const [detailQueryStatus, setDetailQueryStatus] = useState<'pending' | 'success' | 'loading'>('pending')

    const [tracks, setTracks] = useState<TrackDataItem[] | null>(null)

    const [selectedTrackId, setSelectedTrackId] = useState<string | null>(null)
    const [selectedTrack, setSelectedTrack] = useState<TrackResponse | null>(null)
    const abortControllerRef= useRef<AbortController | null>(null)

    useEffect( () => {
        fetch('https://musicfun.it-incubator.app/api/1.0/playlists/tracks', {
            headers: {
                'API-KEY': "8b90cddd-f776-4a2a-9095-25f652e76b49"
            }
        })
            .then(res => res.json() as Promise<TracksResponse>)
            .then(json => {
                setTracks(json.data)
                setListQueryStatus('success')
            })
    }, [])

    const handleSelectTrackClickHandler = (trackId: string) => {
        setSelectedTrackId(trackId)
        setDetailQueryStatus('loading')

        abortControllerRef.current?.abort()

        abortControllerRef.current = new AbortController()

        fetch('https://musicfun.it-incubator.app/api/1.0/playlists/tracks/' + trackId, {
            signal: abortControllerRef.current.signal,
            headers: {
                'API-KEY': "8b90cddd-f776-4a2a-9095-25f652e76b49"
            }
        })
            .then(res => res.json() as Promise<TrackResponse>)
            .then(json => {
                setSelectedTrack(json)
                setDetailQueryStatus('success')
            })
    }

  return (
      <>
          <h1>MusicFun</h1>
          <div style={{'display': 'flex', 'gap': '20px'}}>
              <ul>
                  <h2>List</h2>
                  {listQueryStatus === 'loading' && <p>Loading...</p>}
                  {listQueryStatus === 'success' && tracks?.map((track) => {
                      const color = track.id === selectedTrackId ? "red" : "black"

                      return (
                          <li style={{color: color}}>
                              <h4 onClick={() => handleSelectTrackClickHandler(track.id)}>{track.attributes.title}</h4>
                              <audio src={track.attributes.attachments[0].url} controls={true}/>
                          </li>
                      )
                  })}
              </ul>

              <div>
                  <h2>Detail</h2>
                  {detailQueryStatus === 'loading' && <p>Loading...</p>}

                  {detailQueryStatus === 'success' && selectedTrack && <div>
                      <h3>{selectedTrack.data.attributes.title}</h3>
                      <div>{new Date(selectedTrack.data.attributes.addedAt).toLocaleString()}</div>
                      <div>likes: {selectedTrack.data.attributes.likesCount}</div>
                      <div>lyrics: {selectedTrack.data.attributes.lyrics}</div>
                  </div>}
              </div>
          </div>
      </>
  )
}
