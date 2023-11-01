import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useCustomContext } from '../../components/customContexts';
import { placeOfWorkFetchSuccess, placeOfWorkFetchFailure } from '../../redux/placeOfWorkSlice';
import useAuthAxios from '../auth/useAuthAxios';
import urls from '../../api/urls';

const useFetchPlaceOfWork = () => {
    const dispatch = useDispatch();
    const authAxios = useAuthAxios();
    const { postFlag } = useCustomContext();

    const fetchPlaceOfWork = async () => {
        try {
            const response = await authAxios.get(urls.PlaceOfWork);
            dispatch(placeOfWorkFetchSuccess(response.data));
        } catch (error) {
            dispatch(placeOfWorkFetchFailure(error.response.data));
        }
    };
    useEffect(() => {
        fetchPlaceOfWork();
    }, [dispatch, postFlag]);

    return fetchPlaceOfWork;
}

export default useFetchPlaceOfWork;