import { Box, Typography, IconButton } from '@mui/material';
import Styles from './PaymentStyle.module.scss';
import { useState, useEffect, useRef } from 'react';
import { getBooking } from '../../services/bookingService';
import { filterBookingDetailToPayment } from '../../utils/filterData';

import { checkBankService } from '../../services/checkBankService';
import { updateBooking } from '../../services/bookingService';

import Arlet from '../../components/Alert/index';
import CloseIcon from '@mui/icons-material/Close';

function payment({ user, paymentId , setPaymentId }) {
    const [booking, setBooking] = useState();
    const [urlAccountBank, setUrlAccountBank] = useState("https://img.vietqr.io/image/970422-412468684444-qr_only.png");

    const [open, setOpen] = useState(false)
    const [status, setStatus] = useState()
    const [message, setMessage] = useState()
    const [checkContent, setCheckContent] = useState()

    const intervalRef = useRef()
    const timeoutRef = useRef()
    const dashboardTimeoutRef = useRef()


    const fetchBooking = async () => {
        const response = await getBooking(paymentId)
        if (response) {
            let fiteredBooking = filterBookingDetailToPayment(response)
            setBooking(fiteredBooking)
            setUrlAccountBank((old) => {
                if (old) {
                    if (!old.includes('?amount=')) {
                        setCheckContent(user.id.replace(/-/g, "") + fiteredBooking.id)
                        return old + "?amount=" + fiteredBooking.price + "&addInfo=" + user.id + fiteredBooking.id
                    }
                }
                return old
            })
        }
    }

    const checkPaid = async (price) => {
        const response = await checkBankService()
        if (response) {
            checkPaidContent(response, price)
        }
    }

    const checkPaidContent = async (content, price) => {
        let size = content.length;
        let copyContent = [...content];

        let priceCheck = Number(price);

        console.log(checkContent)

        for (let i = 0; i < size; i++) {
            console.log(copyContent[i].content)
            if (copyContent[i].content.includes(checkContent) && priceCheck >= copyContent[i].price) {
                handleArlet();
                setTimeout(async () => {
                    await updateBooking(booking.id, { status: 1 })
                    clearInterval(intervalRef.current)
                    clearTimeout(timeoutRef.current)
                    clearTimeout(dashboardTimeoutRef.current);
                    setPaymentId(null)
                }, [1000])
            }
        }
    }

    console.log(urlAccountBank)

    const handleArlet = async () => {
        setOpen(true)
        setStatus('success')
        setMessage('Đã thanh toán thành công')
    }

    useEffect(() => {
        fetchBooking()
    }, [])

    useEffect(() => {
        if (booking) {
            timeoutRef.current = setTimeout(() => {
                intervalRef.current = setInterval(() => {
                    checkPaid(booking.price)
                }, [1000])
            }, 5000)

            dashboardTimeoutRef.current = setTimeout(() => {
                setPaymentId(null)
            }, 600000);
        }

        return () => {
            clearInterval(intervalRef.current)
            clearTimeout(timeoutRef.current)
            clearTimeout(dashboardTimeoutRef.current);
        }
    },[booking])


    return (
        <>
            <Box
                className={`${Styles.payment} animate__animated animate__tada`}
            >
                <IconButton
                    onClick={() => setPaymentId(null)}
                    sx={{
                        position: 'absolute',
                        right: '10px',
                        top: '10px',
                        backgroundColor: '#f5f5f5',
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <Box
                    sx={{
                        width: '30%',
                        padding: '20px',
                        backgroundColor: '#f5f5f5',
                        borderRadius: '5px',
                        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                        marginRight: '20px',

                    }}
                >
                    <Typography
                        sx={{
                            mr: 2,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            textDecoration: 'none',
                        }}
                        variant="h5"
                    >
                        Information Payment
                    </Typography>
                    <Typography
                        sx={{
                            mr: 2,
                            fontFamily: 'monospace',
                        }}
                    >
                        <b>Giá tiền: </b>{booking?.price} VND
                    </Typography>
                    <Typography
                        sx={{
                            mr: 2,
                            fontFamily: 'monospace',
                        }}
                    >
                        <b>Nội dung chuyển khoản: </b>{booking?.contents}.000 VND
                    </Typography>
                </Box>
                <img
                    className={Styles.qrCode}
                    src={urlAccountBank} alt="QR Code"
                />
            </Box>
            <Arlet
                open={open}
                message={message}
                status={status}
                setOpen={setOpen}
                />
        </>
    )

}

export default payment;