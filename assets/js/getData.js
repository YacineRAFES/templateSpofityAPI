export async function get(url) {
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Authorization": `Bearer  ${localStorage.getItem('access_token')}`
            }
        });
        if (!response.ok) {
            new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();

    }catch (error) {
        console.error("Error in get function:", error);
        throw error;
    }

}