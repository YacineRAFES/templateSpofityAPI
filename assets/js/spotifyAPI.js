import { get } from './getData.js';
import { apiCall } from './utilitaires/listApiCall.js';

export async function getCurrentlyPlayingTrack(){
    const response = await get(apiCall.getCurrentlyPlayingTrack);
    console.log(response);

}