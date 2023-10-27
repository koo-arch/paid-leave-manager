import React, { useEffect, useState } from 'react';
import { set, format } from 'date-fns';
import { useForm, Controller } from 'react-hook-form';
import { useCustomContext } from '../../components/customContexts';
import useAuthAxios from '../../hooks/auth/useAuthAxios';
import DropdownSelect from '../../components/dropdownSelect';
import urls from '../../api/urls';
import DateField from '../../components/dateField';
import NumberInput from '../../components/numberInput';
import FormDialog from '../../components/formDialog';
import { FormControl } from '@mui/material'; 
import { errorMessage } from '../../utils/errorMessage';
import usePlaceSelect from '../../hooks/features/usePlaceSelect';


const RegisterLeaveDays = (props) => {
    const { create } = props;
    const { postFlag, setPostFlag, setSnackbarStatus } = useCustomContext();
    const authAxios = useAuthAxios();
    const { register, handleSubmit, control, setError, setValue, reset, formState: { errors } } = useForm();
    
    const { places, selectedPlace, selectedPlaceId, setSelectedPlace } = usePlaceSelect();

    useEffect(() => {
        setValue('place', selectedPlaceId);
    },[selectedPlaceId, setValue])


    // ダイアログ開閉
    const [dialogIsOpen, setDialogIsOpen] = useState(false);
    const openDialog = () =>  setDialogIsOpen(true);
    const closeDialog = () => setDialogIsOpen(false);


    const postLeaveDays = async (data) => {
        return await authAxios.post(urls.LeaveDays, data)
    }

    const onSubmit = (data) => {
        console.log(data);
        data.effective_date = format(data.effective_date, 'yyyy-MM-dd')
        console.log(data);
        postLeaveDays(data)
            .then((res) => {
                console.log(res.data);
                setSnackbarStatus({
                    open: true,
                    severity: 'success',
                    message: '有給情報を登録しました。'
                });
                setPostFlag(!postFlag);
                closeDialog();
                reset();
            })
            .catch((err) => {
                console.log(err.response.data);
                const errRes = err.response.data;
                const message = "有給情報登録に失敗しました。"
                errorMessage(errRes, setError, setSnackbarStatus, message);

            })
    }


    const AprilFirst = set(new Date(), { month: 3, date: 1 });

    return (
        <div>
            <input type='hidden' onClick={openDialog} ref={create} />
            <FormDialog
                open={dialogIsOpen}
                onClose={closeDialog}
                title="有給日数登録"
                buttonText="登録"
            >
                <form id="dialog-form" onSubmit={handleSubmit(onSubmit)}>
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
                                        setSelectedPlace(e.target.value);
                                    }}
                                    error={!!errors.place_name}
                                    helperText={errors.place_name?.message}
                                    options={places}
                                />
                            )}
                        />
                    </FormControl>

                    <Controller
                        name="effective_date"
                        control={control}
                        defaultValue={AprilFirst}
                        render={({ field: { onChange, value } }) => 
                            <DateField 
                                label="有給適用日" 
                                onChange={onChange} 
                                value={value} 
                            />
                        }
                    />
                    <Controller
                        name="leave_days"
                        control={control}
                        defaultValue=""
                        render={({ field: { onChange, value } }) =>
                            <NumberInput
                                label="有給日数"
                                onChange={onChange}
                                value={value}
                                error={!!errors.leave_days}
                                helperText={errors.leave_days?.message}
                            />
                        }
                    />
                </form>
            </FormDialog>
        </div>
    )
}

export default RegisterLeaveDays;