import { base64encode, generateRandomString, sha256 } from "./utilitaires/utils";
import { CONFIG } from "../../configdev/config";

export async function Auth(){
    const codeVerifier  = generateRandomString(64);

    const hashed = await sha256(codeVerifier)
    const codeChallenge = base64encode(hashed);

    const clientId = CONFIG.SPOTIFY_CLIENT_ID;
    const redirectUri = 'http://127.0.0.1:8080/';

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