import * as request from '../utils/httpRequest';

export const createBooking = async (booking) => {
    return await request.post('/Booking/Booking', booking);
}