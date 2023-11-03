import React from 'react';
import { Link } from 'react-router-dom';
import DateCalendar from '../features/schedules/DateCalendar';
import { useSelector } from 'react-redux';
import { useCustomContext } from '../components/customContexts';
import CustomSnackbar from '../components/customSnackbar';
import { Box, Container, Typography, Button } from '@mui/material';

const Top = () => {
    const { snackbarStatus } = useCustomContext();
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    return (
        <Box>
            {isAuthenticated ?
                <Container maxWidth="md">
                    <Typography component={"h1"} variant='h3'>
                        有給カレンダー
                    </Typography>
                    <DateCalendar/>
                </Container>
                :
                <Container component={"main"} maxWidth="md">
                    <Box
                        sx={{
                            marginTop: 14,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <div>
                            <Typography component={"h1"} variant="h3" sx={{ mt: 3 }}>
                                有給カレンダー
                            </Typography>
                            <Button
                                variant="contained"
                                fullWidth
                                component={Link}
                                to="/register"
                                size="large"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                新規登録
                            </Button>
                            <Button
                                variant="outlined"
                                fullWidth
                                component={Link}
                                to="/login"
                                size="large"
                                sx={{ mb: 2 }}
                            >
                                ログイン
                            </Button>
                        </div>
                    </Box>
                </Container>
            }
            <CustomSnackbar {...snackbarStatus} />
        </Box>
    )
}

export default Top;