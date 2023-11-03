import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import placeOfWorkReducer from './placeOfWorkSlice';
import paidLeaveSchedulesReducer from './paidLeaveSchedulesSlice';
import leaveDaysReducer from './leaveDaysSlice';
import daysLeftReducer from './daysLeftSlice';


// ローカルストレージから状態を取得
const persistedState = localStorage.getItem('reduxState')
    ? JSON.parse(localStorage.getItem('reduxState'))
    : {};

const store = configureStore({
    reducer: {
        auth: authReducer,
        placeOfWork: placeOfWorkReducer,
        paidLeaveSchedules: paidLeaveSchedulesReducer,
        leaveDays: leaveDaysReducer,
        daysLeft: daysLeftReducer,
    },
    preloadedState: persistedState,
});

// Reduxの状態をローカルストレージに保存
store.subscribe(() => {
    localStorage.setItem('reduxState', JSON.stringify(store.getState()));
});


export default store;