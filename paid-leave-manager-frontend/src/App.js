import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ContextProvider } from './components/customContexts';
import GuestRoute from './components/guestRoute';
import PrivateRoute from './components/privateRoute';
import ResponsiveDrawer from './components/responsiveDrawer';
import Top from './pages/top';
import Login from './pages/login';
import Register from './pages/register';
import Activation from './pages/activation';
import SendActivation from './pages/sendActivation';
import ResendActivation from './pages/resendActivation';
import Account from './pages/account';
import ResetPassword from './pages/resetPassword';
import ResetPasswordConfirm from './pages/resetPasswordConfirm';
import PlaceInfo from './pages/placeInfo';
import Schedule from './pages/schedule';
import NotFound from './pages/notFound';
import { CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme, typography } from '@mui/material/styles';

const App = () => {
  const theme = createTheme({
    typography: {
      fontFamily: [
        'Roboto',
        '"Noto Sans JP"',
        '"Helvetica"',
        'Arial',
        'sans-serif',
      ].join(','),
      button: {
        fontWeight: 'bold', // ボタンのテキストのフォントウェイトを太くする
      },
    },
  });
  theme.typography.h3 = {
    fontSize: '1.6rem',
    '@media (min-width:600px)': {
      fontSize: '1.8rem',
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '2.4rem',
    },
  };
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
        <BrowserRouter>
          <ContextProvider>
            <ResponsiveDrawer>
              <Routes>
                <Route path="/" element={<Top />} />
                
                <Route path="" element={<GuestRoute />}>
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path='/activate/:uid/:token' element={<Activation />} />
                  <Route path='/activate/send' element={<SendActivation />} />
                  <Route path='/activate/resend' element={<ResendActivation />} />
                  <Route path='/password/reset' element={<ResetPassword />} />
                  <Route path='/password/reset/confirm/:uid/:token' element={<ResetPasswordConfirm />} />
                </Route>

                <Route path='' element={<PrivateRoute />}>
                  <Route path='/account' element={<Account />} />
                  <Route path="/info" element={<PlaceInfo />} />
                  <Route path="/schedule" element={<Schedule />} />
                </Route>
                <Route path="*" element={<NotFound />} />
              </Routes>
            </ResponsiveDrawer>
          </ContextProvider>
        </BrowserRouter>
    </ThemeProvider>

  );
}

export default App;
