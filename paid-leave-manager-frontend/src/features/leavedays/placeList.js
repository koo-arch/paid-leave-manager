import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useCustomContext } from '../../components/customContexts';
import useAuthAxios from '../../hooks/auth/useAuthAxios';
import TableField from './tableField';
import urls from '../../api/urls';
import Loading from '../../components/loading';


const initioalState = [{
    id: 0,
    name: '',
}]

const PlaceList = (props) => {
    const { openDialog } = props;
    const placeOfWork = useSelector((state) => state.placeOfWork);
    const [placeInfoList, setPlaceInfoList] = useState(initioalState);
    const [isLoading, setIsLoading] = useState(true);
    const { setSnackbarStatus, postFlag } = useCustomContext();
    const authAxios = useAuthAxios();

    const fetchPlaceList = async () => {
        return await authAxios.get(urls.PlaceOfWork)
    }

    useEffect(() => {
        fetchPlaceList()
            .then((res) => {
                console.log(res.data);
                setPlaceInfoList(res.data);
            })
            .catch((err) => {
                console.log(err.response.data);
                setSnackbarStatus({
                    open: true,
                    severity: 'error',
                    message: '勤務先情報の取得に失敗しました。'
                });
            })
            .then(() => {
                setIsLoading(false);
            })
    }, [postFlag])

    const colmuns = [
        { field: 'name', headerName: '勤務先名', width: 200 },
    ]


    return (
        <div>
            {isLoading ? <Loading open={isLoading} />
                :
                <TableField
                    rows={placeInfoList}
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