import { useEffect, useState } from 'react';
import { getSmallCourtById } from '../../services/courtService';
import ShowImage from '../../components/ShowImage/index';

import Styles from './CourtStyles.module.scss';
import { Link, useNavigate, useParams } from 'react-router-dom';

import {
    Box,
    ImageList,
    ImageListItem,
    Typography,
    Chip,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from '@mui/material';

import { LoadingButton } from '@mui/lab';

import { formatDateTime, formatDateStartEnd, formatDate } from '../../utils/formatTime';
import Arlet from '../../components/Alert/index';
import { createBooking } from '../../services/bookingService';
import 'animate.css'
import { handleCheckDateGreaterThenNow } from '../../utils/checkTime';

function courtId() {
    const {courtId } = useParams();
    const [court, setCourt] = useState(null);
    const [user, setUser] = useState(null);
    const [timeslot, setTimeslot] = useState(null);
    const [showImage, setShowImage] = useState(null);
    const [loadingBooking, setLoadingBooking] = useState(false);

    const [timeslots, setTimeslots] = useState([]);
    const [timeslotsTemp, setTimeslotsTemp] = useState([]);
    const [selectedDate, setSelectedDate] = useState("");
    const [dates, setDates] = useState([]);

    const [open, setOpen] = useState(false)
    const [message, setMessage] = useState('')
    const [status, setStatus] = useState('')

    const navigate = useNavigate()

    const fetchCourt = async () => {
        let res = await getSmallCourtById(courtId);
        if (res.status == 404) {
            navigate('*')
            return;
        }
        var timeSlots = res.timeSlots;
        var dates = [];
        timeSlots.forEach(item => {
            var date = formatDate(item.timeStart);
            if (!dates.includes(date)) {
                dates.push(date);
            }
        })
        console.log(dates);
        setDates(dates);
        setSelectedDate(dates[0]);
        setTimeslots(timeSlots);
        setTimeslotsTemp(timeSlots);
        setCourt(res);
    }

    useEffect(() => {
        fetchCourt();
        setUser(JSON.parse(localStorage.getItem('user')))
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
        let resutlRes = false;
        let id;
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
            if (res.status == 400) {
                resutlRes = false;
            }
            else {
                id = res.id;
                resutlRes = true;
            }  
        } else {
            resutlRes = false;
        }

        if (resutlRes) {
            setOpen(true)
            setMessage('Đặt sân thành công')
            setStatus('success')
            setLoadingBooking(false);
        } else {
            setOpen(true)
            setMessage('Đặt sân thất bại')
            setStatus('error')
            setLoadingBooking(false);
        }
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
                    <ImageList sx={{ width: 'auto', height: 250 }} variant="quilted" cols={3} rowHeight={164}>
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
                            <Typography>{court?.price}.000 VND</Typography>
                        </Box>
                        <Box
                            className={Styles["box-info-item"]}
                        >
                            <Typography>Thông tin liên lạc:</Typography>
                            <Typography>{court?.numberManager != null ? court?.numberManager : "N/A"}</Typography>
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
                            sx={{
                                scrollY: 'auto',
                            }}
                        >
                           
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Ngày đặt sân:</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Ngày đặt sân:"
                                    value={selectedDate}
                                    onChange={(e) => {
                                        setSelectedDate(e.target.value);
                                        let temp = timeslotsTemp.filter(item => formatDate(item.timeStart) == e.target.value);
                                        setTimeslots(temp);
                                    }}
                                >
                                    {dates.map((date, index) => (
                                        <MenuItem key={index} value={date}>{date}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                        <Box
                            className={Styles["box-info-booking-timeslot-item"]}
                        >
                            {timeslots.map((item, index) => {
                                if (handleCheckDateGreaterThenNow(item.timeStart)) {
                                    return (<Chip
                                        key={index}
                                        label={formatDateStartEnd(item.timeStart, item.timeEnd)}
                                        color={timeslot?.id === item.id ? 'primary' : 'default'}
                                        sx={{
                                            '& .MuiChip-label': {
                                                display: 'block',
                                                whiteSpace: 'normal',
                                            },
                                        }}
                                        size="large"
                                        onClick={() => handleChooseTimeSlot(item)}
                                    />);
                                }
                                return (
                                    <Chip
                                        key={index}
                                        label={formatDateStartEnd(item.timeStart, item.timeEnd)}
                                        color={timeslot?.id === item.id ? 'primary' : 'default'}
                                        sx={{
                                            '& .MuiChip-label': {
                                                display: 'block',
                                                whiteSpace: 'normal',
                                            },
                                        }}
                                        disabled
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