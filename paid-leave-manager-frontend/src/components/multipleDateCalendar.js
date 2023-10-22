import React, { useState, useEffect } from 'react';
import { Calendar } from '@bjarkehs/react-nice-dates';
import '@bjarkehs/react-nice-dates/build/style.css';
import { isSameDay } from 'date-fns';
import { ja } from 'date-fns/locale';

const MultipleDateCalendar = ({ isReadOnly }) => {
    const [selectedDates, setSelectedDates] = useState([]);
    useEffect(() => {
        const dates = [new Date(), new Date(2021, 9, 2)];
        setSelectedDates(dates);
    },[]);
    
    const handleDayClick = date => {
        if (isReadOnly) return;
        if (selectedDates.some(selectedDate => isSameDay(selectedDate, date))) {
            // クリックされた日付が既に存在していた場合、その日付を配列から取り除き、setSelectedDatesを実行します。
            setSelectedDates(
                selectedDates.filter(selectedDate => !isSameDay(selectedDate, date))
                )
            } else {
                // クリックされた日付が既に存在していない場合、今まで通り配列に日付を追加します。
                setSelectedDates([...selectedDates, date])
            }
        };
        const modifiers = {
            selected: (date) => selectedDates.some((selectedDate) => isSameDay(selectedDate, date)),
        };
        
    return (
        <Calendar
            onDayClick={handleDayClick}
            modifiers={modifiers}
            locale={ja}
            touchDragEnabled={true}
        />
    );
}

export default MultipleDateCalendar;