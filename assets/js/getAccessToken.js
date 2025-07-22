import { CONFIG } from '../../configdev/config.js';
import { timestamp_expires } from "./utilitaires/time.js";

export async function getAccessToken() {
    try{
        const response = await fetch("https://accounts.spotify.com/api/token", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
                grant_type: "client_credentials",
                client_id: CONFIG.SPOTIFY_CLIENT_ID,
                client_secret: CONFIG.SPOTIFY_CLIENT_SECRET
            }).toString()
        });
        const json = await response.json();
        const data = {
            access_token:   json.access_token,
            start:          Date.now(),
            expires:        timestamp_expires(json.expires_in)
        }
        console.log("getAccessToken.js : " + data.access_token);
        localStorage.setItem('access_token', JSON.stringify(data));
    }catch(error){
        console.error(error);
        throw error;
    }

}

// curl --request GET --url https://api.spotify.com/v1/me/player/currently-playing --header 'Authorization: Bearer BQACbdEvaM-5VbA7U1Rvar5Tyc6zKMyHIbcYllRF4VS_tje4FLBEtSiHJXH6-vovkuBFkn7Q91lANNZiLXI_b7a-_E_Xm3I64DL_P4fvL0eYtdgJveIqBN_f4Xcx5O4AYFpUmR1FrcU'