import { CONFIG } from '../../configdev/config.js';

export async function getAccessToken() {
    try{
        localStorage.removeItem("access_token");
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
        console.log(json);

        localStorage.setItem('access_token', json.access_token);
    }catch(error){
        console.error(error);
        throw error;
    }

}