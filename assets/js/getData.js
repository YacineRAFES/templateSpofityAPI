export async function get(url, Token) {
    const response = await fetch("https://api.spotify.com" + url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${Token}`
        }
    });
    const json = await response.json();

    console.log(json);
}