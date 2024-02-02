import axios from "axios";

const fetchClothes = async () => {
    try {
        const response = await axios.get('http://localhost:8000/clothes', {
            withCredentials: true,
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching clothes data:', error);
    }
}

export default fetchClothes;