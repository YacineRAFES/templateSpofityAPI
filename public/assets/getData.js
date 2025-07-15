export async function get(url, authToken) {
    const response = await fetch("https://api.spotify.com" + url, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${authToken}`
        }
    });
    return response.json();
}