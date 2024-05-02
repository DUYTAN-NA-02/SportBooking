import * as request from '../utils/httpRequest';

export const getBigCourt = async () => {
    return await request.get('/bigCourt/getListBigCourts');
}

export const getSmallCourtById = async (id) => {
    return await request.get(`/Court/GetCourt/${id}`);
}