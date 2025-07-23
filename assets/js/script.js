import {apiCall} from './utilitaires/listApiCall.js';
import {getCurrentlyPlayingTrack} from "./spotifyAPI.js";
import {getAccessToken} from "./getAccessToken.js";
import {timestamp_expires} from "./utilitaires/time.js";
import {askAuth, getmusic, getToken} from "./test.js";
//
// getAccessToken();

// timestamp_expires("3600");

// getCurrentlyPlayingTrack();

// getmusic();

document.getElementById('authorize').addEventListener('click', async () => askAuth());

const urlParams = new URLSearchParams(window.location.search);
let code = urlParams.get('code');

getToken(code);

document.getElementById('musicCurrently').addEventListener('click', async () => getmusic());