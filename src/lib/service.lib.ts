const API_URL = process.env.NEXT_PUBLIC_API_URL || process.env.API_URL

export const getServices = async () => {
    try {
        const response = await fetch(`${API_URL}/services`, { cache: "no-store"});

        if (response.status === 200) {
            return response.json();
        }
        return undefined;
    } catch (error) {
        console.error(error);
        return undefined;
    }
}

export const getService = async (id: string) => {
    try {
        const response = await fetch(`${API_URL}/services/${id}`, { cache: "no-store"});

        if (response.status === 200) {
            return response.json();
        }
        return undefined;
    } catch (error) {
        console.error(error);
        return undefined;
    }
}


export const getServicesWithPriority = async (priority: number) => {
    try {
        const response = await fetch(`${API_URL}/services?priority=${priority}`);

        if (response.status === 200) {
            return response.json();
        }
        return undefined;
    } catch (error) {
        console.error(error);
        return undefined;
    }
}