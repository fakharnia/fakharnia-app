const API_URL = process.env.API_URL
const CLIENT_API_URL = process.env.NEXT_PUBLIC_API_URL;
const SERVER_URL = process.env.SERVER_URI;

export const getStatus = async () => {
    try {
        console.log("THIS IS API URL: ", API_URL);
        const response = await fetch(`${API_URL}/status`, {
            cache: "no-cache"
        });

        if (response.status === 200) {
            return response.json();
        }
        return undefined;
    } catch (error) {
        return undefined;
    }
}

export const getBlogRecent = async () => {
    try {
        const response = await fetch(`${API_URL}/blog`, {
            cache: "no-cache"
        });

        if (response.status === 200) {
            return response.json();
        }
        return undefined;
    } catch (error) {
        return undefined;
    }
}

export const getContacts = async () => {
    try {
        const response = await fetch(`${API_URL}/contact`, {
            cache: "no-cache"
        });

        if (response.status === 200) {
            return response.json();
        }
        return undefined;
    } catch (error) {
        return undefined;
    }
}