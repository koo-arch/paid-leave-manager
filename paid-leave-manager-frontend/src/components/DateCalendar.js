import React, { useState, useEffect } from 'react';
import { Calendar } from '@bjarkehs/react-nice-dates';
import '@bjarkehs/react-nice-dates/build/style.css';
import { isSameDay } from 'date-fns';
import { ja } from 'date-fns/locale';

const DateCalendar = ({ selectedDates, onDayClick }) => {

    const modifiers = {
        selected: (date) => selectedDates.some((selectedDate) => isSameDay(selectedDate, date)),
    };


    return (
        <Calendar
            onDayClick={onDayClick}
            modifiers={modifiers}
            locale={ja}
            touchDragEnabled={true}
        />
    );
}

export default DateCalendar;