import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getSmallCourtById } from '../../services/courtService';

import Styles from './CourtStyles.module.scss';
import { Link } from 'react-router-dom';

import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Typography from '@mui/material/Typography';

import image from '../../assets/court.png';

function courtId() {
    const { courtId } = useParams();
    const [court, setCourt] = useState(null);

    const fetchCourt = async () => {
        let res = await getSmallCourtById(courtId);
        console.log(res);
        setCourt(res);
    }

    useEffect(() => {
        fetchCourt();
        window.scrollTo(0, 0);
    }, [])
    return (
        <Box
            sx={{
                marginTop: '90px',
            }}
        >
            <Typography
                sx={{
                    fontFamily: 'monospace',
                    textDecoration: 'none',
                    marginLeft: '60px',
                }}
                variant="h5">
                <Link to="/" className={Styles["link"]}>Home</Link>
                /Court/{courtId}
            </Typography>
            <Typography
                sx={{
                    fontFamily: 'monospace',
                    textDecoration: 'none',
                    fontWeight: 700,
                    marginLeft: '60px',
                }}
                variant="h6">
                Information of court
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
            <Box>
                <Box>
                    User booking
                </Box>
                <Box>
                    Time slots
                </Box>
            </Box>
        </Box>
    );
}

export default courtId;