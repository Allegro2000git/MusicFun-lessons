import type {TrackResponse, TracksResponse} from "./types/types";

export const api = {
   async getTracks() {
        const res = await fetch('https://musicfun.it-incubator.app/api/1.0/playlists/tracks', {
            headers: {
                'API-KEY': "8b90cddd-f776-4a2a-9095-25f652e76b49"
            }
        })
            const json = await res.json() as Promise<TracksResponse>
            return json
    },
    async getTrack(trackId: string, signal?: AbortSignal) {
        const res = await fetch('https://musicfun.it-incubator.app/api/1.0/playlists/tracks/' + trackId, {
            signal,
            headers: {
                'API-KEY': "8b90cddd-f776-4a2a-9095-25f652e76b49"
            }
        })
        const json = await res.json() as Promise<TrackResponse>
        return json
    }
}