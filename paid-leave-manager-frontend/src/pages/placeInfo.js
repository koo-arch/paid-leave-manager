import React, { useRef } from 'react';
import { Typography, Container } from '@mui/material';
import { useCustomContext } from '../components/customContexts';
import CustomSnackbar from '../components/customSnackbar';
import RegisterPlace from '../features/leavedays/registerPlace';
import RegisterLeaveDays from '../features/leavedays/registerLeaveDays';
import PlaceList from '../features/leavedays/placeList';
import LeaveDaysList from '../features/leavedays/leaveDaysList';

const PlaceInfo = () => {
    const { snackbarStatus } = useCustomContext();

    const placeRef = useRef();
    const leaveDaysRef = useRef();

    const openPlaceDialog = () => placeRef.current.click();
    const openLeaveDaysDialog = () => leaveDaysRef.current.click();
    return (
        <div>
            <Container>
                <Typography component={"h1"} variant='h3'>
                    勤務先情報
                </Typography>
            </Container>
            <PlaceList openDialog={openPlaceDialog}/>
            <RegisterPlace create={placeRef}/>
            <LeaveDaysList openDialog={openLeaveDaysDialog}/>
            <RegisterLeaveDays create={leaveDaysRef}/>
            <CustomSnackbar {...snackbarStatus} />
        </div>
    )
}

export default PlaceInfo;