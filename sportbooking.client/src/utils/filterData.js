import { formatDateTime } from './formatTime';

export const filterColumnBooking = (booking) => {
    return {
        id: booking.id,
        courtId: booking.courtId,
        nameCourt: booking.court.name,
        timeStart: formatDateTime(booking.timeSlot.timeStart),
        timeEnd: formatDateTime(booking.timeSlot.timeEnd),
        price: booking.court.price + ".000 VND",
        status: booking.status == 0 ? "Chờ xử lý" : "Đã thanh toán",
    }
}

export const filterBookingDetailToPayment = (booking) => {
    return {
        id: booking.id,
        price: booking.court.price+"000",
        contents: `Thanh toán sân ${booking.court.name} vào lúc ${formatDateTime(booking.timeSlot.timeStart)} - ${formatDateTime(booking.timeSlot.timeEnd)} với số tiền là ${booking.court.price}`,
    }
}