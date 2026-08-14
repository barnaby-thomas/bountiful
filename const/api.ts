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

export const userLogin = async ( email: string, password: string) => {
    try{
        const login = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                },
            body: JSON.stringify({ email, password }),
        });
        const data = await login.json();
        return data;
    } catch (error){
        console.error('Login failed:', error);
        return null;
    }
};

export const userRegistration = async ( email: string, password: string, username: string ) => {
    try{
        const register = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify({ email, password, username })
        })
        const data = await register.json();
        return data
    } catch (error){
        console.error('Registration failed:', error);
        return null;
    }
};

export const saveSpot = async (userId: number, latitude: number, longitude: number, notes: string, plantId?: number) => {
    try {
        const response = await fetch(`${API_URL}/spots`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, latitude, longitude, notes, plantId }),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error saving spot:', error);
        return null;
    }
};

export const fetchSpots = async (userId: number) => {
    try {
        const response = await fetch(`${API_URL}/spots/${userId}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching spots:', error);
        return [];
    }
};

export const unlockPlant = async (userId: number, plantId: number) => {
    try {
        const response = await fetch(`${API_URL}/unlock`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId, plantId }),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error unlocking plant:', error);
        return null;
    }
};

export const findPlantByLatinName = async (latinName: string) => {
    try {
        const response = await fetch(`${API_URL}/plants/latin/${encodeURIComponent(latinName)}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error finding plant:', error);
        return null;
    }
};