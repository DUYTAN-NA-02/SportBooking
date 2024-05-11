import * as request from '../utils/httpRequest';

export const createBooking = async (booking) => {
    return await request.post('/Booking/Booking', booking);
}

export const getBookings = async (id) => {
    return await request.get(`/Booking/GetBookingByUser/${id}`);
}

export const getBooking = async (id) => {
    return await request.get(`/Booking/Booking/${id}`);
}

export const updateBooking = async (id, updateBooking) => {
    return await request.put(`/Booking/Booking/${id}`, updateBooking);
}