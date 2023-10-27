import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useCustomContext } from '../../components/customContexts';
import useFetchPlaceOfWork from '../../hooks/api/useFetchPlaceOfWork';
import TableField from './tableField';
import Loading from '../../components/loading';


const PlaceList = (props) => {
    const { openDialog } = props;
    const placeOfWork = useSelector((state) => state.placeOfWork);
    const { postFlag } = useCustomContext();
    const fetchPlaceOfWork = useFetchPlaceOfWork();

    useEffect(() => {
        fetchPlaceOfWork();
    }, [postFlag]);

    const isLoading = placeOfWork.isLoading;

    const colmuns = [
        { field: 'name', headerName: '勤務先名', width: 200 },
    ]


    return (
        <div>
            {isLoading ? <Loading open={isLoading} />
                :
                <TableField
                    rows={placeOfWork.places}
                    columns={colmuns}
                    openDialog={openDialog}
                    title="勤務先一覧"
                    message="勤務先情報がありません。"
                />
            }
        </div>
    )
}

export default PlaceList;