import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { leaveDaysFetchSuccess, leaveDaysFetchFailure } from '../../redux/leaveDaysSlice';
import useAuthAxios from '../auth/useAuthAxios';
import urls from '../../api/urls';

const useFetchLeaveDays = () => {
    const dispatch = useDispatch();
    const authAxios = useAuthAxios();

    const fetchLeaveDays = async () => {
        try {
            const response = await authAxios.get(urls.leaveDays);
            dispatch(leaveDaysFetchSuccess(response.data));
        } catch (error) {
            dispatch(leaveDaysFetchFailure(error.response.data));
        }
    };
    useEffect(() => {
        fetchLeaveDays();
    }, [dispatch]);

    return fetchLeaveDays;
}

export default useFetchLeaveDays;