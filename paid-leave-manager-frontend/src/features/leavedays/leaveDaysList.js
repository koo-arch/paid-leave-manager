import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useCustomContext } from '../../components/customContexts';
import TableField from './tableField';
import Loading from '../../components/loading';


const formatData = (data) => {
    return data.map((item) => {
        const place_name = item.place?.name || "";
        return {
            id: item.id || 0,
            place_name: place_name || "",
            effective_date: item.effective_date || "",
            leave_days: item.leave_days || 0,
        }
    })
}

const LeaveDaysList = (props) => {
    const { openDialog } = props;
    const leaveDays = useSelector((state) => state.leaveDays);

    const isLoading = leaveDays.isLoading;
    const placeInfoList = formatData(leaveDays.days);

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

export default LeaveDaysList;