import React, { useEffect } from 'react';
import { FormControl } from '@mui/material';
import DropdownSelect from '../../components/dropdownSelect';
import usePlaceSelect from '../../hooks/features/usePlaceSelect';
import { Controller, useFormContext } from 'react-hook-form';


const PlaceSelect = ({ handlePlaceChange, places, selectedPlace }) => {
    const { control, formState: { errors } } = useFormContext();
    return (
        <div>
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
        </div>
    )
}

export default PlaceSelect;