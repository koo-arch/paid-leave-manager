import React from 'react';
import DateCalendar from '../components/DateCalendar';
import { useCustomContext } from '../components/customContexts';
import CustomSnackbar from '../components/customSnackbar';
import { Box } from '@mui/material';

const Top = () => {
    const { snackbarStatus } = useCustomContext();
    return (
        <Box>
            {/* <DateCalendar/> */}
            <CustomSnackbar {...snackbarStatus} />
        </Box>
    )
}

export default Top;