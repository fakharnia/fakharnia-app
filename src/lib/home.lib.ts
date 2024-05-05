const API_URL = process.env.API_URL

export const getStatus = async () => {
    try {
        const response = await fetch(`${API_URL}/status`, { cache: "no-store" });

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
            cache: "no-store"
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
            cache: "no-store"
        });

        if (response.status === 200) {
            return response.json();
        }
        return undefined;
    } catch (error) {
        return undefined;
    }
}