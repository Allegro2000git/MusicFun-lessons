import type {TrackResponse, TracksResponse} from "./types/types";

export const api = {
    getTracks() {
        return fetch('https://musicfun.it-incubator.app/api/1.0/playlists/tracks', {
            headers: {
                'API-KEY': "xxx"
            }
        })
            .then(res => res.json() as Promise<TracksResponse>)
    },
    getTrack(trackId: string, signal?: AbortSignal) {
        return fetch('https://musicfun.it-incubator.app/api/1.0/playlists/tracks/' + trackId, {
            signal,
            headers: {
                'API-KEY': "xxx"
            }
        })
            .then(res => res.json() as Promise<TrackResponse>)
    }
}