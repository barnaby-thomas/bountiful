const API_URL = 'http://192.168.0.15';

export const fetchPlants = async () => {
    try {
        const response = await fetch(`${API_URL}/plants`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching plants:', error);
        return [];
    }
};

export const fetchPlant = async (id: string) => {
    try {
        const response = await fetch(`${API_URL}/plants/${id}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching plant:', error);
        return null;
    }
};