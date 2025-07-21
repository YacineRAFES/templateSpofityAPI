import { getAccessToken } from './getAccessToken.js';

export async function get(url) {
    // Je vérifie si le token est déjà stocké dans le localStorage
    let Token = localStorage.getItem('access_token');
    // Si le token n'existe pas ou il est vide
    if(Token==null || Token===''){
        // J'appelle la fonction pour obtenir le AccessToken et je le stocke dans le localStorage
        await getAccessToken();
    }

    let tentative = 0;
    while(tentative < 3) {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('access_token')}`
            }
        });
        const json = await response.json();

        if (json.error && json.error.status < 400) {
            await getAccessToken();
            tentative++;
            continue;
        }
        console.log(json);

        return json;
    }
}