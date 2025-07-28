import { get } from './getData.js';
import { apiCall } from './utilitaires/listApiCall.js';

export async function getCurrentlyPlayingTrack(){
    const json = await get(apiCall.getCurrentlyPlayingTrack);
    console.log(json);

    return {
        album: json.item.name,
        artist: json.item.artists[0].name,
        image: json.item.album.images[0].url,
        progress: json.progress_ms,
        duration: json.item.duration_ms,
    }
}