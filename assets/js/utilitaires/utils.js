export function getAccessTokenStorage(){
    const data = localStorage.getItem('access_token');
    const parsedData = JSON.parse(data);
    console.log("utils.js : " + JSON.parse(data).access_token);
    return {
        access_token:   parsedData.access_token,
        start:          parsedData.start,
        expires:        parsedData.expires
    }

}
export function generateRandomString(length) {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const values = crypto.getRandomValues(new Uint8Array(length));
    return values.reduce((acc, x) => acc + possible[x % possible.length], "");
}

export function sha256(plain) {
    const encoder = new TextEncoder()
    const data = encoder.encode(plain)
    return window.crypto.subtle.digest('SHA-256', data)
}

export function base64encode(input){
    return btoa(String.fromCharCode(...new Uint8Array(input)))
        .replace(/=/g, '')
        .replace(/\+/g, '-')
        .replace(/\//g, '_');
}