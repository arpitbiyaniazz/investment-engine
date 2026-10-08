const API_URL = 'http://localhost:5002/api';

export const analyzeProfile = async (data) => {
    try {
        const response = await fetch(`${API_URL}/analyze`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error('Analysis failed');
        return await response.json();
    } catch (error) {
        console.error("API Error", error);
        throw error;
    }
};
