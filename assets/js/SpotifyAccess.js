import {base64encode, generateRandomString, sha256} from "./utilitaires/utils.js";
import {CONFIG} from "../../configdev/config.js";

const clientId = CONFIG.SPOTIFY_CLIENT_ID;
const redirectUri = CONFIG.SPOTIFY_REDIRECT_URI;

export const SpotifyAccess = {
    getAuthorization,
    getToken,
    getRefreshToken
}

async function getAuthorization(){
    const codeVerifier  = generateRandomString(64);

    const hashed = await sha256(codeVerifier);
    const codeChallenge = base64encode(hashed);

    const scope = 'user-read-playback-state user-read-currently-playing';
    const authUrl = new URL("https://accounts.spotify.com/authorize");

    window.localStorage.setItem('code_verifier', codeVerifier);

    const params =  {
        response_type: 'code',
        client_id: clientId,
        scope,
        code_challenge_method: 'S256',
        code_challenge: codeChallenge,
        redirect_uri: redirectUri,
    }

    authUrl.search = new URLSearchParams(params).toString();
    window.location.href = authUrl.toString();
}

async function getToken(code) {
    try{
        const codeVerifier = localStorage.getItem('code_verifier');
        const url = "https://accounts.spotify.com/api/token";
        const payload = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                client_id: clientId,
                grant_type: 'authorization_code',
                code,
                redirect_uri: redirectUri,
                code_verifier: codeVerifier,
            }),
        }

        const body = await fetch(url, payload);
        const response = await body.json();

        localStorage.setItem('access_token', response.access_token);
        localStorage.setItem('refresh_token', response.refresh_token);
        localStorage.setItem('expires_in', response.expires_in);
    }catch(error){
        console.error(error);
        throw error;
    }
}

async function getRefreshToken() {
    // refresh token that has been previously stored
    const refreshToken = localStorage.getItem('refresh_token');
    const url = "https://accounts.spotify.com/api/token";

    const payload = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token: refreshToken,
            client_id: clientId
        }),
    }
    const body = await fetch(url, payload);
    const response = await body.json();

    localStorage.setItem('access_token', response.access_token);
    if (response.refresh_token) {
        localStorage.setItem('refresh_token', response.refresh_token);
    }
}

