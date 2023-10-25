import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useCustomContext } from '../../components/customContexts';
import useAuthAxios from '../../hooks/auth/useAuthAxios';
import TableField from './tableField';
import urls from '../../api/urls';
import Loading from '../../components/loading';


const initioalState = [{
    id: 0,
    place_name: '',
    effective_date: '',
    leave_days: 0,
}]

const formatData = (data) => {
    return data.map((item) => {
        const place_name = item.place.name || "";
        return {
            id: item.id || 0,
            place_name: place_name || "",
            effective_date: item.effective_date || "",
            leave_days: item.leave_days || 0,
        }
    })
}

const LaaveDaysList = (props) => {
    const { openDialog } = props;
    const placeOfWork = useSelector((state) => state.placeOfWork);
    const [placeInfoList, setPlaceInfoList] = useState(initioalState);
    const [isLoading, setIsLoading] = useState(true);
    const { setSnackbarStatus, postFlag } = useCustomContext();
    const authAxios = useAuthAxios();

    const fetchLeaveDaysList = async () => {
        return await authAxios.get(urls.LeaveDays)
    }

    useEffect(() => {
        fetchLeaveDaysList()
            .then((res) => {
                console.log(res.data);
                setPlaceInfoList([...formatData(res.data)]);
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
    },[postFlag])

    const colmuns = [
        { field: 'place_name', headerName: '勤務先名', width: 200 },
        { field: 'effective_date', headerName: '有給適用日', width: 200 },
        { field: 'leave_days', headerName: '有給日数', width: 200 },
    ]


    return (
        <div>
            {isLoading ? <Loading open={isLoading}/> 
            : 
            <TableField
                rows={placeInfoList}
                columns={colmuns}
                openDialog={openDialog}
                title="有給情報一覧"
                message="勤務先情報がありません。"
            />
            }
        </div>
    )
}

export default LaaveDaysList;