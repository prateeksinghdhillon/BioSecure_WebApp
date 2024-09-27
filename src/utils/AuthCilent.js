import axios from 'axios';

const API_FIRST = axios.create({
    baseURL: 'https://piserver-1bja.onrender.com/api'
});

export const getFromAuth = async (endpoint) => {
    try {
        const response = await API_FIRST.get(endpoint);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const postToAuth = async (endpoint, data) => {
    try {
        const response = await API_FIRST.post(endpoint, data);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};
