import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useCustomContext } from '../../components/customContexts';
import useFetchPlaceOfWork from '../../hooks/api/useFetchPlaceOfWork';

const usePlaceSelect = () => {
    const placeOfWork = useSelector((state) => state.placeOfWork.places);
    const places = [...new Set(placeOfWork.map(item => item.name))];
    const [selectedPlace, setSelectedPlace] = useState('');
    const fetchPlaceOfWork = useFetchPlaceOfWork();

    useEffect(() => {
        fetchPlaceOfWork();
    },[]);

    const selectedObj = placeOfWork.find((item) => item.name === selectedPlace);
    const selectedPlaceId = selectedObj?.id ?? 0;


    return { places, selectedPlace, selectedPlaceId, setSelectedPlace };
};

export default usePlaceSelect;
