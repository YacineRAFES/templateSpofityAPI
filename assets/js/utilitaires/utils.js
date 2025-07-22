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