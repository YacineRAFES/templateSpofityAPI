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

export function timestamp_expires(secondes) {

    // Convert secondes to milliseconds
    const millisecondsToAdd = secondes * 1000;

    // Get the current timestamp
    const currentTimestamp = Date.now();

    // Add the milliseconds to the current timestamp and return the new timestamp
    return currentTimestamp + millisecondsToAdd;

}

export function checkIfLocalStorageExists(key){
    const data = localStorage.getItem(key);
    if (data === null || data === undefined) {
        console.log(`No data found for key: ${key}`);
        return false;
    }
    return true;
}

export function millesecondsToTime(milleseconds){
    const minutes = Math.floor(milleseconds / 60000);
    const seconds = ((milleseconds % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}