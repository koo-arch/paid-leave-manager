import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Calendar } from '@bjarkehs/react-nice-dates';
import '@bjarkehs/react-nice-dates/build/style.css';
import { isSameDay } from 'date-fns';
import LeaveInfo from '../../features/schedules/leaveInfo';
import usePlaceSelect from '../../hooks/features/usePlaceSelect';
import DropdownSelect from '../../components/dropdownSelect';
import CustomLink from '../../components/customLink';
import { ja } from 'date-fns/locale';
import { FormControl, Typography, Button } from '@mui/material';

const DateCalendar = () => {
    const schedules = useSelector(state => state.paidLeaveSchedules.schedules);
    const leaveDays = useSelector(state => state.leaveDays.days);
    const [selectedDates, setSelectedDates] = useState([]);
    const [leaveDaysArray, setLeaveDaysArray] = useState([]);

    const { places, selectedPlace, setSelectedPlace } = usePlaceSelect();

    const handlePlaceChange = (e) => {
        setSelectedPlace(e.target.value);
    }

    useEffect(() => {
        // 選択した場所が変更された場合に registeredDates を更新
        const updatedRegisteredDates = schedules
            .filter(item => item.place.name === selectedPlace)
            .map(item => new Date(item.leave_date));
        console.log(updatedRegisteredDates);

        setSelectedDates(updatedRegisteredDates);
    }, [selectedPlace, schedules]);

    useEffect(() => {
        // leaveDays または selectedPlace が変更された場合に leaveDaysArray を更新
        const updatedLeaveDaysArray = leaveDays
            .filter(item => item.place.name === selectedPlace)
            .map(item => ({
                id: item.id,
                leave_days: item.leave_days,
                left_days: item.left_days,
                effective_date: new Date(item.effective_date).setHours(0, 0, 0, 0),
                deadline: new Date(item.deadline).setHours(0, 0, 0, 0)
            }))
            .sort((a, b) => new Date(a.effective_date) - new Date(b.effective_date));

        setLeaveDaysArray(updatedLeaveDaysArray);
    }, [leaveDays, selectedPlace]);

    const modifiers = {
        selected: (date) => selectedDates.some((selectedDate) => isSameDay(selectedDate, date)),
    };


    return (
        <div>
            <Typography component={"body"} sx={{ mt: 3 }}>
                勤務先を選択すると有給消費日がカレンダーに表示されます。<br/>
                選択肢がない場合は、<CustomLink to="/info">こちら</CustomLink>から情報を登録してください。
            </Typography>
            <FormControl fullWidth>
                <DropdownSelect
                    label="勤務先"
                    value={selectedPlace}
                    onChange={handlePlaceChange}
                    options={places}
                />
            </FormControl>
            <LeaveInfo data={leaveDaysArray} />
            <Calendar
                modifiers={modifiers}
                locale={ja}
                touchDragEnabled={true}
            />
            <Button 
                fullWidth
                size='large'
                component={CustomLink}
                to="/schedule"
                variant="contained"
                sx={{ mt: 3, mb: 2  }}
            >
                有給予定を編集する
            </Button>
        </div>
    );
}

export default DateCalendar;