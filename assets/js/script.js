import { SpotifyAccess } from "./SpotifyAccess.js";
import {getCurrentlyPlayingTrack} from "./spotifyAPI.js";

document.getElementById('authorize').addEventListener('click', async () => SpotifyAccess.getAuthorization());

const urlParams = new URLSearchParams(window.location.search);
let code = urlParams.get('code');

if(code){
    if(await SpotifyAccess.getToken(code)){
        const music = await getCurrentlyPlayingTrack();

        const div = document.getElementById("body");
        div.innerHTML =
            `<div class="container overflow-hidden">
            <div class="row">
                <!-- Image de la musique -->
                <div class="col-2 m-2">
                    <img src="" alt="Music Image" class="img-fluid" id="musicimg">
                </div>
                <div class="col text-white">
                    <h1 id="nameMusic">Revolution 909</h1>
                    <h5 id="nameAuthor">Daft Punk</h5>
                </div>
            </div>
            <div class="row">
            </div>
            <div class="row">
                <div class="col p-0 mx-1 align-items-center d-flex justify-content-center text-white">
                    <div class="px-1">00:00</div>
                    <progress class="w-100 d-flex" value="149446" max="229333"></progress>
                    <div class="px-1">00:00</div>
                </div>
            </div>
        </div>`
    }
}