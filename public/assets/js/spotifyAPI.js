import { get } from './getData.js';
import { SPOTIFY_CLIENT_ID } from '.configdev/config.json';

export async function getCurrentlyPlayingTrack(){
    get('/v1/me/player/currently-playing', SPOTIFY_CLIENT_ID)
}