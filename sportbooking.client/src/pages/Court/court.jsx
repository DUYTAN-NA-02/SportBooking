import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getSmallCourtById } from '../../services/courtService';
import ShowImage from '../../components/ShowImage/index';

import Styles from './CourtStyles.module.scss';
import { Link } from 'react-router-dom';

import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import Chip from '@mui/material/Chip';

import { formatDateTime, formatDateStartEnd } from '../../utils/formatTime';
import Arlet from '../../components/Alert/index';
import { createBooking } from '../../services/bookingService';
import 'animate.css'

function courtId() {
    const {courtId } = useParams();
    const [court, setCourt] = useState(null);
    const [user, setUser] = useState(null);
    const [timeslot, setTimeslot] = useState(null);
    const [showImage, setShowImage] = useState(null);
    const [loadingBooking, setLoadingBooking] = useState(false);

    const [open, setOpen] = useState(false)
    const [message, setMessage] = useState('')
    const [status, setStatus] = useState('')

    const fetchCourt = async () => {
        let res = await getSmallCourtById(courtId);
        console.log(res);
        setCourt(res);
    }

    useEffect(() => {
        fetchCourt();
        setUser(JSON.parse(localStorage.getItem('user')))
        console.log(JSON.parse(localStorage.getItem('user')))
        window.scrollTo(0, 0);
    }, [])

    const handleChooseTimeSlot = (timeSlot) => {
        setTimeslot(timeSlot);
    }
    const handleChooseImage = (e) => {
        setShowImage(e.target.src);
    }

    console.log(timeslot)

    const handleBooking = async () => {
        setLoadingBooking(true);
        if (user && timeslot) {
            console.log(user.id);
            console.log(timeslot.id);
            console.log(court.id);
            let bookingObj = {
                userId: user.id,
                timeSlotId: timeslot.id,
                courtId: court.id,
                status: 0,
            }
            let res = await createBooking(bookingObj);
            console.log(res);
            if (res.status == 400) {
                setOpen(true)
                setMessage('Đặt sân thất bại')
                setStatus('error')
                setLoadingBooking(false);
                return;
            }
            setOpen(true)
            setMessage('Đặt sân thành công')
            setStatus('success')
        } else {
            setOpen(true)
            setMessage('Đặt sân thất bại')
            setStatus('error')
        }
        setLoadingBooking(false);
    }

    return (
        <>
            <Box
                sx={{
                    marginTop: '90px',
                    padding: '0px 60px',
                }}
            >
                <Typography
                    sx={{
                        fontFamily: 'monospace',
                        textDecoration: 'none',
                    }}
                    variant="h6">
                    <Link to="/" className={Styles["link"]}>Home</Link>
                    /Sân bóng/
                </Typography>
                <Typography
                    sx={{
                        fontFamily: 'monospace',
                        textDecoration: 'none',
                        fontWeight: 700,
                    }}
                    variant="h6">
                    Thông tin sân bóng
                </Typography>
                <Box
                    className={Styles["box-main"]}
                >
                    <ImageList sx={{ width: 'auto', height: 200 }} variant="quilted" cols={3} rowHeight={164}>
                        {court?.medias?.map((item, index) => (
                            <ImageListItem sx={{ cursor: "pointer" }} className='animate__animated animate__bounceIn' onClick={handleChooseImage} key={index}>
                                <img
                                    src={`${item.url}`}
                                    loading="lazy"
                                />
                            </ImageListItem>
                        ))}
                    </ImageList>
                    <Box
                        className={Styles["box-info"]}
                    >
                        <Box
                            className={Styles["box-info-item"]}
                        >
                            <Typography>Tên sân bóng:</Typography>
                            <Typography>{court?.name}</Typography>
                        </Box>
                        <Box
                            className={Styles["box-info-item"]}
                        >
                            <Typography>Địa chỉ:</Typography>
                            <Typography>{court?.address}</Typography>
                        </Box>
                        <Box
                            className={Styles["box-info-item"]}
                        >
                            <Typography>Giá tiền:</Typography>
                            <Typography>{court?.price} VND</Typography>
                        </Box>
                        <Box
                            className={Styles["box-info-item"]}
                        >
                            <Typography>Thông tin thêm: </Typography>
                            <Typography>{court?.description}</Typography>
                        </Box>
                    </Box>
                </Box>
                <Box className={Styles["box-info-booking"]}>
                    <Box className={Styles["box-info-booking-user"]}>
                        {user &&
                            <Box>
                                <Typography
                                    sx={{
                                        fontFamily: 'monospace',
                                        textDecoration: 'none',
                                        fontWeight: 700,
                                    }}
                                    variant="h6"
                                >
                                    Thông tin người đặt sân
                                </Typography>
                                <Typography>
                                    Tên người dùng: {user.userName}
                                </Typography>
                                <Typography>
                                    Điện thoại: {user.phoneNumber}
                                </Typography>
                                <Typography>
                                    Thời gian bắt đầu: {timeslot ? formatDateTime(timeslot.timeStart) : "N/A"}
                                </Typography>
                                <Typography>
                                    Thời gian kết thúc: {timeslot ? formatDateTime(timeslot.timeEnd) : "N/A"}
                                </Typography>
                                <Box
                                    sx={{
                                        textAlign: 'center',
                                    }}
                                >
                                    <LoadingButton
                                        loading={loadingBooking}
                                        variant="contained"
                                        sx={{
                                            marginTop: '10px',
                                            backgroundColor: '#f50057',
                                            color: 'white',
                                            '&:hover': {
                                                backgroundColor: '#ff5983',
                                            },
                                            textAlign: 'center',
                                        }}
                                        onClick={handleBooking}
                                    >
                                        Đặt sân bóng này
                                    </LoadingButton>
                                </Box>

                            </Box>}
                    </Box>
                    <Box className={Styles["box-info-booking-timeslot"]}>
                        <Typography
                            sx={{
                                fontFamily: 'monospace',
                                textDecoration: 'none',
                                fontWeight: 700,
                            }}
                            variant="h6"
                        >
                            Chọn khung giờ bạn muốn đặt sân
                        </Typography>
                        <Box
                            className={Styles["box-info-booking-timeslot-item"]}
                        >
                            {court?.timeSlots?.map((item, index) => {
                                return (
                                    <Chip
                                        key={index}
                                        label={formatDateStartEnd(item.timeStart, item.timeEnd)}
                                        color="primary"
                                        sx={{
                                            '& .MuiChip-label': {
                                                display: 'block',
                                                whiteSpace: 'normal',
                                            },
                                        }}
                                        size="large"
                                        onClick={() => handleChooseTimeSlot(item)}
                                    />
                                )
                            })}
                        </Box>
                    </Box>
                </Box>
            </Box>
            {showImage != null && <ShowImage url={showImage} setUrl={setShowImage} />}
            <Arlet open={open} message={message} status={status} setOpen={setOpen} />
        </>
    );
}

export default courtId;