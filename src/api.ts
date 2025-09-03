import type {TrackResponse, TracksResponse} from "./types/types";

export const api = {
    getTracks() {
        return fetch('https://musicfun.it-incubator.app/api/1.0/playlists/tracks', {
            headers: {
                'API-KEY': "8b90cddd-f776-4a2a-9095-25f652e76b49"
            }
        })
            .then(res => res.json() as Promise<TracksResponse>)
    },
    getTrack(trackId: string, signal?: AbortSignal) {
        return fetch('https://musicfun.it-incubator.app/api/1.0/playlists/tracks/' + trackId, {
            signal,
            headers: {
                'API-KEY': "8b90cddd-f776-4a2a-9095-25f652e76b49"
            }
        })
            .then(res => res.json() as Promise<TrackResponse>)
    }
}