import { get } from './getData.js';
import {  }

export async function getCurrentlyPlayingTrack(){
    get('/v1/me/player/currently-playing', localStorage.getItem('spotifyAuthToken'))
}