const API_URL = process.env.API_URL

export const getProjects = async () => {
    try {
        const response = await fetch(`${API_URL}/projects`);

        if (response.status === 200) {
            return response.json();
        }
        return undefined;
    } catch (error) {
        return undefined;
    }
}

export const getProject = async (id: string) => {
    try {
        const response = await fetch(`${API_URL}/projects/${id}`);

        if (response.status === 200) {
            return response.json();
        }
        return undefined;
    } catch (error) {
        return undefined;
    }
}

export const getDesigns = async () => {
    try {
        const response = await fetch(`${API_URL}/designs`);

        if (response.status === 200) {
            return response.json();
        }
        return undefined;
    } catch (error) {
        return undefined;
    }
}

export const getDesign = async (id: string) => {
    try {
        const response = await fetch(`${API_URL}/designs/${id}`);

        if (response.status === 200) {
            return response.json();
        }
        return undefined;
    } catch (error) {
        return undefined;
    }
}

export const getResume = async () => {
    try {
        const response = await fetch(`${API_URL}/resume`);

        if (response.status === 200) {
            return response.json();
        }
        return undefined;
    } catch (error) {
        return undefined;
    }
}