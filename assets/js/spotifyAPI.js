import { get } from './getData.js';
import { CONFIG } from '../../configdev/config.js';

export async function getCurrentlyPlayingTrack(){
    get('/v1/me/player/currently-playing', CONFIG.SPOTIFY_CLIENT_SECRET)
}