import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Style from './HomeStyles.module.scss';

import { useEffect, useState } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import { getBigCourt } from '../../services/courtService';
import MenuItem from '@mui/material/MenuItem';

import DateTimeRangePicker from '../../components/DatePickerRange/index';
import CourtCards from '../../components/CourtCards/index';
import dayjs from 'dayjs';

import imageLogo from '../../assets/image.png';
import imageLogo2 from '../../assets/image-2.png';

function home() {
    const [courts, setCourts] = useState([])
    const [courtSelected, setCourtSelected] = useState(null)
    const [loading, setLoading] = useState(false)

    const [startDate, setStartDate] = useState(dayjs());
    const [endDate, setEndDate] = useState(dayjs());

    const fetchCourts = async () => {
        const res = await getBigCourt()
        console.log(res)
        setCourts(res)
        setCourtSelected(res[0])
    }

    useEffect(() => {
        fetchCourts();
    }, [])

    const handleSelectedCourt = (event) => {
        const selectedCourt = courts.find(court => court.name === event.target.value);
        setCourtSelected(selectedCourt);
    }

    return (
        <>
            <Box className={Style["box-main"]}>
                <Typography
                    sx={{
                        mr: 2,
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        textDecoration: 'none',
                        color: 'white'
                    }}
                    variant="h5">Tìm sân bóng ngay nào
                </Typography>
                <Box
                    className={Style["box-filter"]}
                >
                    <TextField
                        id="namecourt"
                        select
                        label="Loại sân bóng"
                        value={courtSelected?.name || ''}
                        onChange={handleSelectedCourt}
                        InputLabelProps={{ style: { color: 'white' } }}
                        SelectProps={{
                            style: { color: 'white' }, 
                        }}
                        sx={{
                            '& .MuiOutlinedInput-root': { 
                                '& fieldset': { borderColor: 'white' }, 
                                '&:hover fieldset': { borderColor: 'purple' }, 
                                '&.Mui-focused fieldset': { borderColor: 'white' }, 
                            }
                        }}
                    >
                        {courts.map((option) => (
                            <MenuItem key={option.id} value={option.name}>
                                {option.name}
                            </MenuItem>
                        ))}
                    </TextField>
                    <DateTimeRangePicker
                        startDate={startDate}
                        endDate={endDate}
                        setStartDate={setStartDate}
                        themeSet="light"
                        setEndDate={setEndDate} />
                    <LoadingButton
                        loading={loading}
                        onClick={() => setLoading(true)}
                        variant="contained"
                    >
                        Tìm kiếm
                    </LoadingButton>
                </Box>
            </Box>
            <Box
                sx={{
                    margin: '20px 0',
                }}
            >
                <Typography
                    sx={{
                        fontFamily: 'monospace',
                        textDecoration: 'none',
                        marginLeft: '60px',
                    }}
                    variant="h5">Trang chủ
                </Typography>
            </Box>
            <Box className={Style['box-information']}>
                <Box
                    sx={{
                        backgroundColor: '#EDDDDD',
                    }}
                >
                    <Box
                        sx={{
                            padding: '20px',
                        }}
                    >
                        <Typography
                            sx={{
                                fontFamily: 'monospace',
                                textDecoration: 'none',
                            }}
                            variant="h6">Có đầy đủ sân, đa dạng các thể loại cho các bạn lựa chọn
                        </Typography>
                    </Box>
                    <img
                        src={imageLogo}
                        width="312px"
                        height="170px"
                        loading="lazy"
                    />
                </Box>
                <Box
                    sx={{
                        backgroundColor: '#DBC241',
                    }}
                >
                    <Box
                        sx={{
                            padding: '20px',
                        }}
                    >
                        <Typography
                            sx={{
                                fontFamily: 'monospace',
                                textDecoration: 'none',
                            }}
                            variant="h6">
                            Đặt sân nhanh
                            <br/>
                            theo yêu cầu của bạn
                            <br/>
                            chúng tôi sẽ tìm và gửi sân lịch ngay khi bạn cần
                        </Typography>
                    </Box>
                    <img
                        src={imageLogo2}
                        width="312px"
                        height="170px"
                        loading="lazy"
                    />
                </Box>
            </Box>
            <Box className={Style["box-courts"]}>
                <CourtCards courtSelected={courtSelected} />
            </Box>
        </>
    )
}
export default home;