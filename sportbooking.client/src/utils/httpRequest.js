import axios from 'axios';

const httpRequest = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
});

export const get = async (url) => {
    try {
        const response = await httpRequest.get(url);
        return response.data;
    } catch (error) {
        return error.response;
    }
    
}

export const post = async (url, data) => {
    try {
        const response = await httpRequest.post(url, data);
        return response.data;
    } catch (error) {
        return error.response;
    }
}

export const put = async (url, data) => {
    try {
        const response = await httpRequest.put(url, data);
        return response.data;
    } catch (error) {
        return error.response;
    }
}

export const del = async (url) => {
    try {
        const response = await httpRequest.delete(url);
        return response.data;
    } catch (error) {
        return error.response;
    }
}

