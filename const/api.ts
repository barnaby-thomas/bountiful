const API_URL = 'http://localhost:3000';

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

export const identifyPlant = async (base64Image: string) => {
    try{
        const response = await fetch(`${API_URL}/identify`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ image: base64Image }),
        });
        const plantID = await response.json();
        return plantID;
    } catch (error){
        console.error('Plant identification faiure:', error);
        return null;
    }
};