import React from 'react';
import { useCustomContext } from '../components/customContexts';
import CustomSnackbar from '../components/customSnackbar';
import EditSchedule from '../features/schedules/editSchedule';
import { Box, Container, Typography } from '@mui/material';

const Schedule = () => {
    const { snackbarStatus } = useCustomContext();
    return (
        <Container maxWidth="md">
           <Typography component={"h1"} variant='h3'>
                予定
            </Typography>
            <EditSchedule />
            <CustomSnackbar {...snackbarStatus} />
        </Container>
    )
}

export default Schedule;