import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { memo } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#ffffff', // Change to any color you want
        },
    },
    components: {
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    color: '#ffffff', // Change text color
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#ffffff', // Change border color
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#ffffff', // Change border color on hover
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#ffffff', // Change border color when focused
                    },
                },
                input: {
                    color: '#ffffff', // Change input text color
                },
            },
        },
        MuiSvgIcon: {
            styleOverrides: {
                root: {
                    color: '#ffffff', // Change icon color
                },
            },
        },
    },
});

function dateTimePicker({ startDate, endDate, setStartDate, setEndDate }) {

    console.log("re render date time picker")

    return (
        <ThemeProvider theme={theme}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                    value={startDate}
                    onChange={(date) => setStartDate(date)}
                    disablePast
                    views={['year', 'month', 'day', 'hours', 'minutes']}
                />
                <DateTimePicker
                    value={endDate}
                    onChange={(date) => setEndDate(date)}
                    disablePast
                    minDateTime={startDate}
                    views={['year', 'month', 'day', 'hours', 'minutes']}
                />
            </LocalizationProvider>
        </ThemeProvider>
    );
}
export default memo(dateTimePicker);