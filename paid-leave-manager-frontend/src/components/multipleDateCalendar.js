import React, { useState, useEffect } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { Calendar } from '@bjarkehs/react-nice-dates';
import '@bjarkehs/react-nice-dates/build/style.css';
import { isSameDay, set } from 'date-fns';
import { ja } from 'date-fns/locale';
import usePlaceSelect from '../hooks/features/usePlaceSelect';
import { FormControl } from '@mui/material';
import DropdownSelect from './dropdownSelect';
import LeaveInfo from '../features/schedules/leaveInfo';
import PlaceSelect from '../features/schedules/placeSelect';


const MultipleDateCalendar = ({ isReadOnly }) => {
    const schedules = useSelector(state => state.paidLeaveSchedules.schedules);
    const leaveDays = useSelector(state => state.leaveDays.days);
    const { register, control, setValue, formState: { errors } } = useFormContext();
    
    const { places, selectedPlace, selectedPlaceId, setSelectedPlace } = usePlaceSelect();

    const [registeredDates, setRegisteredDates] = useState([]);
    const [leaveDaysArray, setLeaveDaysArray] = useState([]);
    const [selectedDates, setSelectedDates] = useState(registeredDates);

    const handlePlaceChange = (e) => {
        setSelectedPlace(e.target.value);
    }

    useEffect(() => {
        setValue('place', selectedPlaceId);
    }, [selectedPlaceId, setValue])

    useEffect(() => {
        // 選択した場所が変更された場合に registeredDates を更新
        const updatedRegisteredDates = schedules
            .filter(item => item.place.name === selectedPlace)
            .map(item => new Date(item.leave_date));

        setRegisteredDates(updatedRegisteredDates);
    }, [selectedPlace, schedules]);

    useEffect(() => {
        // leaveDays または selectedPlace が変更された場合に leaveDaysArray を更新
        const updatedLeaveDaysArray = leaveDays
            .filter(item => item.place.name === selectedPlace)
            .map(item => ({
                id: item.id,
                leave_days: item.leave_days,
                effective_date: new Date(item.effective_date)
            }))
            .sort((a, b) => new Date(a.effective_date) -  new Date(b.effective_date));

        setLeaveDaysArray(updatedLeaveDaysArray);
    }, [leaveDays, selectedPlace]);
    

    const handleDayClick = date => {
        if (isReadOnly) return;

        const ascLeaveDays =  [...leaveDaysArray]
        if (selectedDates.some(selectedDate => isSameDay(selectedDate, date))) {
            for (let i = 0; i < ascLeaveDays.length; i++) {
                const item = ascLeaveDays[i];
                const effective_date = new Date(item.effective_date);
                let leave_days = item.leave_days;
                if (effective_date < date && leave_days > 0) {
                    leave_days += 1;
                    
                    ascLeaveDays[i] = { ...item, leave_days: leave_days };
                    console.log("削除", ascLeaveDays);
                    setLeaveDaysArray(ascLeaveDays)
                    break;
                }
            }
            // クリックされた日付が既に存在していた場合、その日付を配列から取り除き、setSelectedDatesを実行します。
            setSelectedDates(
                selectedDates.filter(selectedDate => !isSameDay(selectedDate, date))
                )
            
            } else {
                for (let i = 0; i < ascLeaveDays.length; i++) {
                    const item = ascLeaveDays[i];
                    const effective_date = new Date(item.effective_date);
                    let leave_days = item.leave_days;
                    if (effective_date < date && leave_days > 0) {
                        leave_days -= 1;

                        ascLeaveDays[i] = { ...item, leave_days: leave_days };
                        console.log("削除", ascLeaveDays);
                        setLeaveDaysArray(ascLeaveDays)
                        break;
                    }
                }
                // クリックされた日付が既に存在していない場合、今まで通り配列に日付を追加します。
                setSelectedDates([...selectedDates, date])
            }
        };
    const modifiers = {
        selected: (date) => selectedDates.some((selectedDate) => isSameDay(selectedDate, date)),
    };
        
    return (
        <div>
            <input type="hidden" value={selectedPlaceId} {...register("place")} />
            <FormControl>
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
        </div>
    );
}

export default MultipleDateCalendar;