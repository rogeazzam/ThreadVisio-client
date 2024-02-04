import { ClothProps } from "@/types";
import axios from "axios";

export const fetchClothes = async () => {
    try {
        const response = await axios.get('http://localhost:8000/clothes', {
            withCredentials: true,
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching clothes data:', error);
    }
}

export const fetchWishList = async () => {
    try {
        const response = await axios.get('http://localhost:8000/wishlist', {
            withCredentials: true,
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching wishlist data:', error);
    }
}

export const addToWishList = async (cloth: ClothProps) => {
    try {
        const response = await axios.post('http://localhost:8000/addtowishlist', {
            cloth_data: cloth
        }, {
            withCredentials: true
        });

        return response.data;
    } catch (error) {
        console.error('Error adding to wishlist:', error);
    }
}

export const removeFromWishList = async (cloth: ClothProps) => {
    try {
        const response = await axios.post('http://localhost:8000/removefromwishlist', {
            cloth_data: cloth
        }, {
            withCredentials: true
        });

        return response.data;
    } catch (error) {
        console.error('Error removing from wishlist:', error);
    }
}

export const addCloth = async (cloth: ClothProps) => {
    try {
        const response = await axios.post('http://localhost:8000/addcloth', cloth, {
            withCredentials: true
        });
        if (response.data.error) {
            console.log(response.data.error);
        }

        return response.data;
    } catch (error) {
        console.error('Error adding cloth item:', error);
    }
}

export const handleUploadFile = async (data: FormData) => {
    try {
        const response = await axios.post('http://localhost:8000/files/upload', data, {
            withCredentials: true
        });
        if (response.data.error) {
            console.log(response.data.error);
        }

        return response.data;
    } catch (error) {
        console.error('Error uploading file:', error);
    }
}