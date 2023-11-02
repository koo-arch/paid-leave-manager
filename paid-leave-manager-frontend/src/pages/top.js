import React from 'react';
import DateCalendar from '../features/schedules/DateCalendar';
import { useCustomContext } from '../components/customContexts';
import CustomSnackbar from '../components/customSnackbar';
import useFetchPaidLeaveSchedules from '../hooks/api/useFetchPaidLeaveSchedules';
import useFetchPlaceOfWork from '../hooks/api/useFetchPlaceOfWork';
import useFetchLeaveDays from '../hooks/api/useFetchLeaveDays';
import { Box, Container, Typography } from '@mui/material';

const Top = () => {
    const { snackbarStatus } = useCustomContext();

    useFetchPlaceOfWork();
    useFetchPaidLeaveSchedules();
    useFetchLeaveDays();

    return (
        <Box>
            <Container maxWidth="md">
                <Typography component={"h1"} variant='h3'>
                    有給カレンダー
                </Typography>
                <DateCalendar/>
            </Container>
            <CustomSnackbar {...snackbarStatus} />
        </Box>
    )
}

export default Top;