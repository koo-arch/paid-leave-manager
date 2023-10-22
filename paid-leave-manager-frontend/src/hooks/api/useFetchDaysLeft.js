import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { daysLeftFetchSuccess, daysLeftFetchFailure } from '../../redux/daysLeftSlice';
import useAuthAxios from '../auth/useAuthAxios';
import urls from '../../api/urls';

const useFetchDaysLeft = () => {
    const dispatch = useDispatch();
    const authAxios = useAuthAxios();

    const fetchDaysLeft = async () => {
        try {
            const response = await authAxios.get(urls.daysLeft);
            dispatch(daysLeftFetchSuccess(response.data));
        } catch (error) {
            dispatch(daysLeftFetchFailure(error.response.data));
        }
    };
    useEffect(() => {
        fetchDaysLeft();
    }, [dispatch]);

    return fetchDaysLeft;
}

export default useFetchDaysLeft;