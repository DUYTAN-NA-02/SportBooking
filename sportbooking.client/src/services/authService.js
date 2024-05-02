import * as request from '../utils/httpRequest';

export const login = async (email, password) => {
    return await request.post('/auth/account/login', { email, password });
}

export const register = async (email, phone, password) => {
    return await request.post('/auth/account/register', { email, phone , password });
}