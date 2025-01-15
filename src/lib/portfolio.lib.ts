const API_URL = process.env.NEXT_PUBLIC_API_URL || process.env.API_URL

export const getProjects = async () => {
    try {
        const response = await fetch(`${API_URL}/projects`, { cache: "no-store"});

        if (response.status === 200) {
            return response.json();
        }
        return undefined;
    } catch (error) {
        console.error(error);
        return undefined;
    }
}

export const getProject = async (id: string) => {
    try {
        const response = await fetch(`${API_URL}/projects/${id}`, { cache: "no-store"});

        if (response.status === 200) {
            return response.json();
        }
        return undefined;
    } catch (error) {
        console.error(error);
        return undefined;
    }
}

export const getDesigns = async () => {
    try {
        const response = await fetch(`${API_URL}/designs`, { cache: "no-store"});

        if (response.status === 200) {
            return response.json();
        }
        return undefined;
    } catch (error) {
        console.error(error);
        return undefined;
    }
}

export const getDesign = async (id: string) => {
    try {
        const response = await fetch(`${API_URL}/designs/${id}`, { cache: "no-store"});

        if (response.status === 200) {
            return response.json();
        }
        return undefined;
    } catch (error) {
        console.error(error);
        return undefined;
    }
}

export const getResume = async () => {
    try {
        const response = await fetch(`${API_URL}/resume`, { cache: "no-store"});

        if (response.status === 200) {
            return response.json();
        }
        return undefined;
    } catch (error) {
        console.error(error);
        return undefined;
    }
}