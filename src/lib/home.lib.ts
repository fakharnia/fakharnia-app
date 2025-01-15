const API_URL = process.env.NEXT_PUBLIC_API_URL || process.env.API_URL

export const getStatus = async () => {
    try {
        console.log("Response from the Library(Status)_URL: ", API_URL);
        const response = await fetch(`${API_URL}/status`, { cache: "no-store" });
        console.log("Response from the Library(Status)_RESPONSE: ", response);
        if (response.status === 200) {
            return response.json();
        }
        return undefined;
    } catch (error) {
        console.error(error);
        return undefined;
    }
}

export const getBlogRecent = async () => {
    try {
        console.log("Response from the Library(RecentBlog)_URL: ", API_URL);
        const response = await fetch(`${API_URL}/blog`, {
            cache: "no-store"
        });
        console.log("Response from the Library(RecentBlog)_RESPONSE: ", response);

        if (response.status === 200) {
            return response.json();
        }
        return undefined;
    } catch (error) {
        console.error(error);
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