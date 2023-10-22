import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import placeOfWorkReducer from './placeOfWorkSlice';
import paidLeaveSchedulesReducer from './paidLeaveSchedulesSlice';
import leaveDaysReducer from './leaveDaysSlice';
import daysLeftReducer from './daysLeftSlice';


const store = configureStore({
    reducer: {
        auth: authReducer,
        placeOfWork: placeOfWorkReducer,
        paidLeaveSchedules: paidLeaveSchedulesReducer,
        leaveDays: leaveDaysReducer,
        daysLeft: daysLeftReducer,
    },
});

export default store;