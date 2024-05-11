import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { memo } from 'react';
import { useNavigate } from 'react-router-dom';


function courtCards({ courtSelected }) {
    const navigate = useNavigate();

    const handleNavigate = (id) => {
        navigate(`/Court/${id}`)
    }

    const CourtShow = () => {
        const courtsJSON = JSON.stringify(courtSelected);
        const courtsObject = JSON.parse(courtsJSON);
        console.log(courtsObject?.sportGrounds);
        const courts = courtsObject?.sportGrounds?.map((court, index) => {
            return (
                <Card sx={{  width: '100%' , cursor: 'pointer' }} key={index}>
                    <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            {court.name}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            {court.width}m - {court.height}m
                        </Typography>
                        <Typography variant="body2" sx={{
                                    height: '75px', 
                                    overflow: 'auto',
                                    scrollbarWidth: 'none',
                                    '&::-webkit-scrollbar': {
                                        display: 'none'
                                    }}}>
                            <b>Địa chỉ: </b>{court.address}
                            <br />
                            <b>Thông tin thêm: </b>{court.description}
                            <br />
                            <b>Giá tiền: </b>{court.price}.000 VND
                        </Typography>
                    </CardContent>
                    <CardActions
                        sx={{ justifyContent: 'center' }}
                    >
                        <Button
                            onClick={() => {
                                handleNavigate(court.id)
                            }}
                            variant="contained"
                            size="small">Booking</Button>
                    </CardActions>
                </Card>
            )
        })
        return courts;
    }

    return (
        <>
            <CourtShow />
        </>
    )
}

export default memo(courtCards);