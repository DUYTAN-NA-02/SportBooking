import { Box, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';

import { getBookings } from '../../services/bookingService';
import { filterColumnBooking } from '../../utils/filterData';

import { useNavigate } from 'react-router-dom';
import Payment from '../../components/Payment/index';

function Dashboard() {
    window.scrollTo(0, 0);
    const [bookings, setBookings] = useState([]);
    const [isLoadingTable, setIsLoadingTable] = useState(false);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || {})
    const [paymentId, setPaymentId] = useState();
    const [clickTimeout, setClickTimeout] = useState(null);
    const navigate = useNavigate();

    const columnBooking = [
        { field: 'id', headerName: 'ID', flex: 1 },
        { field: 'courtId', headerName: 'Mã sân bóng', flex: 1 },
        { field: 'nameCourt', headerName: 'Tên sân', flex: 1 },
        { field: 'timeStart', headerName: 'Check in', flex: 1.5 },
        { field: 'timeEnd', headerName: 'Check out', flex: 1.5 },
        { field: 'price', headerName: 'Giá tiền', flex: 1.5 },
        { field: 'status', headerName: 'Trạng thái', flex: 1.5 },
    ];

    const fetchBookings = async () => {
        setIsLoadingTable(true);
        const res = await getBookings(user.id);
        if (res) {
            console.log(res);
            let filterData = res?.map((booking) => {
                return filterColumnBooking(booking);
            })
            console.log(filterData);
            setBookings(filterData);
        }
        setIsLoadingTable(false);
    }

    useEffect(() => {
        fetchBookings();
    }, [paymentId]);

    const handleRowClick = (id) => {
        if (clickTimeout !== null) {
            clearTimeout(clickTimeout);
        }
        setClickTimeout(setTimeout(() => {
            navigate(`/court/${id}`);
        }, 250));
    }

    const handleRowDoubleClick = (id, status) => {
        if (status.includes("Chờ xử lý")) {
            clearTimeout(clickTimeout);
            setClickTimeout(null);
            setPaymentId(id)
        }
    }

    return (
        <>
            <Box
                sx={{
                    paddingTop: '75px',
                    paddingLeft: '20px',
                    paddingRight: '20px',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <Typography
                        variant="h6"
                        sx={{
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.2rem',
                            color: 'inherit',
                        }}
                    >Thông tin về những sân bóng bạn đã đặt</Typography>
                    <Box
                        sx={{
                            padding: '10px',
                            backgroundColor: 'rgba(0, 0, 0, 0.1)',
                            borderRadius: '5px',
                        }}
                    >
                        <Typography
                            variant="h7"
                        > <b>Click đôi </b>để vào thanh toán những hóa đơn đang chờ</Typography>
                        <br></br>
                        <Typography
                            variant="h7"
                        > <b>Click đơn </b>coi sân chi tiết sân bóng</Typography>
                    </Box>
                </Box>
                <Box
                    sx={{
                        with: '100%',
                        height: '75vh',
                        marginTop: '20px',
                    }}
                >
                    <DataGrid
                        columns={columnBooking}
                        rows={bookings}
                        onRowClick={(row) => handleRowClick(row?.row?.courtId)}
                        onRowDoubleClick={(row) => handleRowDoubleClick(row.id, row?.row?.status)}
                        getRowId={(row) => row.id}
                        initialState={{
                            columns: {
                                columnVisibilityModel: { _id: false }
                            },
                        }}
                        pageSizeOptions={[10, 30, 50, 70, 100]}
                        loading={isLoadingTable}
                    />
                </Box>
            </Box>
            {paymentId != null && <Payment user={user} paymentId={paymentId} setPaymentId={setPaymentId} />}
        </>
    )
}

export default Dashboard;