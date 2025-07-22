import { getAccessToken } from './getAccessToken.js';
import { getAccessTokenStorage } from "./utilitaires/utils.js";

export async function get(url) {
    try {
        const data = localStorage.getItem('access_token');
        if (!data) {
            await getAccessToken();
        } else {
            const tokenData = JSON.parse(data);
            if (Date.now() > tokenData.expires) {
                await getAccessToken();
            }
        }
        console.log(getAccessTokenStorage().access_token );
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${getAccessTokenStorage().access_token }`
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const json = await response.json();
        return json;

    }catch (error) {
        console.error("Error in get function:", error);
        throw error;
    }

}