import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useCustomContext } from '../../components/customContexts';
import { paidLeaveSchedulesFetchSuccess, paidLeaveSchedulesFetchFailure } from '../../redux/paidLeaveSchedulesSlice';
import useAuthAxios from '../auth/useAuthAxios';
import urls from '../../api/urls';

const useFetchPaidLeaveSchedules = () => {
    const dispatch = useDispatch();
    const authAxios = useAuthAxios();
    const { postFlag } = useCustomContext();

    const fetchPaidLeaveSchedules = async () => {
        try {
            const response = await authAxios.get(urls.PaidLeaveSchedule);
            dispatch(paidLeaveSchedulesFetchSuccess(response.data));
        } catch (error) {
            dispatch(paidLeaveSchedulesFetchFailure(error.response.data));
        }
    };
    useEffect(() => {
        fetchPaidLeaveSchedules();
    }, [dispatch, postFlag]);

    return fetchPaidLeaveSchedules;
}

export default useFetchPaidLeaveSchedules;