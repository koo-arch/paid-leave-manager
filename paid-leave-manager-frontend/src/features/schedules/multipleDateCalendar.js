import React, { useState, useEffect } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { Calendar } from '@bjarkehs/react-nice-dates';
import '@bjarkehs/react-nice-dates/build/style.css';
import { isSameDay, format } from 'date-fns';
import { ja } from 'date-fns/locale';
import usePlaceSelect from '../../hooks/features/usePlaceSelect';
import { FormControl } from '@mui/material';
import DropdownSelect from '../../components/dropdownSelect';
import LeaveInfo from './leaveInfo';


const MultipleDateCalendar = ({ isReadOnly, updatePlaceStatus, updateDaysStatus }) => {
    const schedules = useSelector(state => state.paidLeaveSchedules.schedules);
    const leaveDays = useSelector(state => state.leaveDays.days);
    const { register, control, setValue, formState: { errors } } = useFormContext();
    
    const { places, selectedPlace, selectedPlaceId, setSelectedPlace } = usePlaceSelect();

    const [leaveDaysArray, setLeaveDaysArray] = useState([]);
    const [selectedDates, setSelectedDates] = useState([]);

    const handlePlaceChange = (e) => {
        setSelectedPlace(e.target.value);
        updatePlaceStatus(e.target.value !== "");
        updateDaysStatus(false);
    }

    useEffect(() => {
        setValue('place', selectedPlaceId);
    }, [selectedPlaceId, setValue])

    useEffect(() => {
        setValue('leave_dates', selectedDates.map(date => format(date, 'yyyy-MM-dd')));
    }, [selectedPlace, selectedDates, setValue]);

    useEffect(() => {
        // 選択した場所が変更された場合に registeredDates を更新
        const updatedRegisteredDates = schedules
            .filter(item => item.place.name === selectedPlace)
            .map(item => new Date(item.leave_date));

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
            .sort((a, b) => new Date(a.effective_date) -  new Date(b.effective_date));

        setLeaveDaysArray(updatedLeaveDaysArray);
    }, [leaveDays, selectedPlace]);

    console.log("leaveDays", leaveDays);

    const handleDayClick = date => {
        if (isReadOnly) return;

        const updatedLeaveDays =  [...leaveDaysArray]
        let dateModified = false; // デフォルトは日付が変更されていないことを示すフラグ

        if (selectedDates.some(selectedDate => isSameDay(selectedDate, date))) {
            // クリックされた日付が既に存在している場合の処理

            // カレンダーの選択解除時に、left_days を元に戻す処理
            for (let i = updatedLeaveDays.length - 1; i > -1; i--) {
                const item = updatedLeaveDays[i];
                const effective_date = new Date(item.effective_date);
                const deadline = new Date(item.deadline);
                const leave_days = item.leave_days;
                let left_days = item.left_days;
                
                if (effective_date <= date && date < deadline && left_days >= 0 && leave_days > left_days) {
                    left_days += 1;
                    
                    updatedLeaveDays[i] = { ...item, left_days: left_days };
                    console.log("削除", updatedLeaveDays);
                    setLeaveDaysArray(updatedLeaveDays)
                    updateDaysStatus(true);
                    dateModified = true;
                    break;
                }
            }
            if (!dateModified) return;

            // クリックされた日付が selectedDates にある場合、その日付を削除。
            const removedDate =  selectedDates.filter(selectedDate => !isSameDay(selectedDate, date))
            setSelectedDates(removedDate)
            
            } else {
                // クリックされた日付が存在していない場合の処理

                // カレンダーの選択時に、left_days を減らす処理
                for (let i = 0; i < updatedLeaveDays.length; i++) {
                    const item = updatedLeaveDays[i];
                    const effective_date = new Date(item.effective_date);
                    const deadline = new Date(item.deadline);
                    let left_days = item.left_days;

                    if (effective_date <= date && date < deadline && left_days > 0) {
                        left_days -= 1;

                        updatedLeaveDays[i] = { ...item, left_days: left_days };
                        console.log("追加", updatedLeaveDays);
                        setLeaveDaysArray(updatedLeaveDays)
                        updateDaysStatus(true);
                        dateModified = true;
                        break;
                    }
                }
                if (!dateModified) return;

                // クリックされた日付が selectedDates にない場合、その日付を追加。
                const addedDate = [...selectedDates, date]
                setSelectedDates(addedDate)
            }
        };
    const modifiers = {
        selected: (date) => selectedDates.some((selectedDate) => isSameDay(selectedDate, date)),
    };

    return (
        <div>
            <input type="hidden" value={selectedPlaceId} {...register("place")} />
            <FormControl fullWidth>
                <Controller
                    name="place_name"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <DropdownSelect
                            label="勤務地"
                            value={selectedPlace}
                            onChange={(e) => {
                                field.onChange(e);
                                handlePlaceChange(e);
                            }}
                            error={!!errors.place_name}
                            helperText={errors.place_name?.message}
                            options={places}
                        />
                    )}
                />
            </FormControl>
            <LeaveInfo data={leaveDaysArray} />
            <Calendar
                onDayClick={handleDayClick}
                modifiers={modifiers}
                locale={ja}
                touchDragEnabled={true}
            />
            <input type="hidden" value={selectedDates} {...register("leave_dates")} />
        </div>
    );
}

export default MultipleDateCalendar;