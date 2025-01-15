const API_URL = process.env.NEXT_PUBLIC_API_URL || process.env.API_URL
const SERVER_URL = process.env.SERVER_URI;

export const getTags = async () => {
    try {
        const response = await fetch(`${API_URL}/tags`, { cache: "no-store" });

        if (response.status === 200) {
            return response.json();
        }
        return undefined;
    } catch (error) {
        return undefined;
    }
}

export const getPosts = async (page: number = 1, perPage: number = 5, search: string = "", tags: string = "", sort: string = "createdAt", sortFlow: string = "desc") => {
    try {

        let parameters = `page=${page}&perPage=${perPage}&search=${search}&tags=${tags}&sort=${sort}&sortFlow=${sortFlow}`;

        const response = await fetch(`${API_URL}/posts?${parameters}`, { cache: "no-store" });

        if (response.status === 200) {
            return response.json();
        }
        return undefined;
    } catch (error) {
        return undefined;
    }
}

export const getPost = async (id: string) => {
    try {
        const response = await fetch(`${API_URL}/posts/${id}`, { cache: "no-store" });

        if (response.status === 200) {
            return response.json();
        }
        return undefined;
    } catch (error) {
        return undefined;
    }
}

export const getPostContent = async (id: string, fileUrl: string) => {
    try {
        const response = await fetch(`${SERVER_URL}/post/${id}/${fileUrl}`,);
        if (response.status === 200) {
            return response.text();
        }
        return undefined;
    } catch (error) {
        console.error(error);
        return undefined;
    }
}

export const postView = async (id: string) => {
    try {
        const response = await fetch(`${API_URL}/view/${id}`, {
            method: 'POST',
        });

        if (response.status === 200) {
            return response.json();
        }
        return undefined;
    } catch (error) {
        console.error(error);
        return undefined;
    }
}