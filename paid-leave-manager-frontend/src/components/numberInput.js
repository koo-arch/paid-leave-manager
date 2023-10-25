import React from 'react';
import { TextField } from '@mui/material';

const NumberInput = (props) => {
    const { value, onChange, name, label, error, helperText } = props;


    // 文字列の構成が0~9のみかつ、maxより小さい場合に入力を受け付ける
    const handleInputChange = (e) => {
        const inputValue = e.target.value;
        if (/^\d*$/.test(inputValue)) {
            const numericValue = inputValue === '' ? '' : parseInt(inputValue);
            if (numericValue >= 0) {
                onChange(numericValue);
            }
        }
    };

    return (
        <div>
            <TextField
                label={label}
                name={name}
                fullWidth
                required
                margin='normal'
                variant="outlined"
                value={value === '' ? '' : value}
                onChange={handleInputChange}
                error={error}
                helperText={helperText}
            />
        </div>
    );
};

export default NumberInput;