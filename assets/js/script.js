import { SpotifyAccess } from "./SpotifyAccess.js";
import { getCurrentlyPlayingTrack } from "./spotifyAPI.js";

document.getElementById('authorize').addEventListener('click', async () => SpotifyAccess.getAuthorization());

const urlParams = new URLSearchParams(window.location.search);
let code = urlParams.get('code');

if(code){
    console.log("Code received: " + code);
    await SpotifyAccess.getToken(code);
}

if (localStorage.getItem('access_token')) {
    console.log("Access token found in localStorage");
    setInterval(async () => {
        const music = await getCurrentlyPlayingTrack();
        const div = document.getElementById("body");
        const body =
            `<div class="container overflow-hidden">
            <div class="row">
                <!-- Image de la musique -->
                <div class="col-2 m-2">
                    <img src="${music.image}" alt="Music Image" class="img-fluid" id="musicimg">
                </div>
                <!-- les information de la musique -->
                <div class="col text-white">
                    <h1 id="nameMusic">${music.album}</h1>
                    <h5 id="nameAuthor">${music.artist}</h5>
                </div>
            </div>
        </div>`;
        div.innerHTML = body;
    }, 5000);
}