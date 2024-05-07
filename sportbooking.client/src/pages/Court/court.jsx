import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getSmallCourtById } from '../../services/courtService';

import Styles from './CourtStyles.module.scss';
import { Link } from 'react-router-dom';

import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import image from '../../assets/court.png';

import DateTimeRangePicker from '../../components/DatePickerRange/index';
import dayjs from 'dayjs';

function courtId() {
    const { courtId } = useParams();
    const [court, setCourt] = useState(null);
    const [user, setUser] = useState(null);
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();

    const fetchCourt = async () => {
        let res = await getSmallCourtById(courtId);
        setCourt(res);
    }

    useEffect(() => {
        fetchCourt();
        setUser(JSON.parse(localStorage.getItem('user')))
        window.scrollTo(0, 0);
    }, [])

    return (
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
                <Box sx={{ width: 448, height: 200, overflowY: 'scroll' }}>
                    <ImageList variant="masonry" cols={3} gap={8}>
                        <ImageListItem key="1">
                            <img
                                width="448px"
                                height="200px"
                                loading="lazy"
                                src={image}
                            />
                        </ImageListItem>
                    </ImageList>
                </Box>
                <Box
                    className={Styles["box-info"]}
                >
                    <Box
                        className={Styles["box-info-item"]}
                    >
                        <Typography>Name of court:</Typography>
                        <Typography>{court?.name}</Typography>
                    </Box>
                    <Box
                        className={Styles["box-info-item"]}
                    >
                        <Typography>Address:</Typography>
                        <Typography>{court?.address}</Typography>
                    </Box>
                    <Box
                        className={Styles["box-info-item"]}
                    >
                        <Typography>Price:</Typography>
                        <Typography>{court?.price} VND</Typography>
                    </Box>
                    <Box
                        className={Styles["box-info-item"]}
                    >
                        <Typography>Description: </Typography>
                        <Typography>{court?.description}</Typography>
                    </Box>
                </Box>
            </Box>
            <Box className={Styles["box-info-booking"]}>
                <Box className={Styles["box-info-booking-user"]}>
                    {user &&
                        <Box>
                            <Typography>
                                User name: {user.username}
                            </Typography>
                            <Typography>
                                Phone: {user.phone}
                            </Typography>
                            <DateTimeRangePicker
                                startDate={startDate}
                                endDate={endDate}
                                setStartDate={setStartDate}
                                setEndDate={setEndDate}
                                themeSet="dark"
                                disableEdit={true}
                            />
                            <Button
                                variant="contained"
                            >
                                Book this court
                            </Button>

                        </Box>}
                </Box>
                <Box className={Styles["box-info-booking-timeslot"]}>
                    <Box
                        className={Styles["box-info-booking-timeslot-item"]}
                    >
                        13/4/2021
                        17h-18h
                    </Box>
                    <Box
                        className={Styles["box-info-booking-timeslot-item"]}
                    >
                        13/4/2021
                        17h-18h
                    </Box>
                    <Box
                        className={Styles["box-info-booking-timeslot-item"]}
                    >
                        13/4/2021
                        17h-18h
                    </Box>
                    <Box
                        className={Styles["box-info-booking-timeslot-item"]}
                    >
                        13/4/2021
                        17h-18h
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

export default courtId;