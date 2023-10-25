import React from 'react';
import MultipleDateCalendar from '../components/multipleDateCalendar';
import { useCustomContext } from '../components/customContexts';
import CustomSnackbar from '../components/customSnackbar';
import { Box } from '@mui/material';

const Top = () => {
    const { snackbarStatus } = useCustomContext();
    return (
        <Box>
            <MultipleDateCalendar isReadOnly={true}/>
            <CustomSnackbar {...snackbarStatus} />
        </Box>
    )
}

export default Top;