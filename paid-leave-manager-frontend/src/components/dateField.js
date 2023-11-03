import React from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { ja } from 'date-fns/locale';

const DateField = (field) => {
    return (
        <LocalizationProvider 
            dateAdapter={AdapterDateFns}
            adapterLocale={ja}
            dateFormats={{ monthAndYear: "yyyy年 MM月" }}
        >
            <DatePicker
                slotProps={{ 
                    textField: { 
                        required: true,
                        fullWidth: true,
                        margin: "normal",
                    } 
                }}
                {...field}
            />
        </LocalizationProvider>
    )
}

export default DateField;