import React from 'react';
import { useCustomContext } from '../components/customContexts';
import CustomSnackbar from '../components/customSnackbar';
import EditSchedule from '../features/schedules/editSchedule';
import { Container, Typography } from '@mui/material';
import useFetchPaidLeaveSchedules from '../hooks/api/useFetchPaidLeaveSchedules';
import useFetchLeaveDays from '../hooks/api/useFetchLeaveDays';
import useFetchPlaceOfWork from '../hooks/api/useFetchPlaceOfWork';

const Schedule = () => {
    const { snackbarStatus } = useCustomContext();
    
    useFetchPaidLeaveSchedules();
    useFetchLeaveDays();
    useFetchPlaceOfWork();

    return (
        <Container maxWidth="md">
           <Typography component={"h1"} variant='h3'>
                有給予定編集
            </Typography>
            <EditSchedule />
            <CustomSnackbar {...snackbarStatus} />
        </Container>
    )
}

export default Schedule;