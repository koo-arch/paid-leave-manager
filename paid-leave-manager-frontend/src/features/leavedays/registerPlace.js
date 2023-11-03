import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useCustomContext } from '../../components/customContexts';
import useAuthAxios from '../../hooks/auth/useAuthAxios';
import urls from '../../api/urls';
import { TextField, Fab } from '@mui/material';
import { errorMessage } from '../../utils/errorMessage';
import FormDialog from '../../components/formDialog';


const RegisterPlace = (props) => {
    const { create } = props;
    const authAxios = useAuthAxios();
    const { postFlag, setPostFlag, setSnackbarStatus } = useCustomContext();
    const { register, handleSubmit, setError, reset, formState: { errors } } = useForm();

    const [dialogIsOpen, setDialogIsOpen] = useState(false);
    const openDialog = () => setDialogIsOpen(true);
    const closeDialog = () => setDialogIsOpen(false);

    const postPlaceOfWork = async (data) => {
        return await authAxios.post(urls.PlaceOfWork, data)
    }

    const onSubmit = (data) => {
        console.log(data);
        postPlaceOfWork(data)
            .then((res) => {
                console.log(res.data);
                setSnackbarStatus({
                    open: true,
                    severity: 'success',
                    message: '勤務先情報を登録しました。'
                });
                setPostFlag(!postFlag);
                closeDialog();
                reset();
            })
            .catch((err) => {
                console.log(err.response.data);
                const errRes = err.response.data;
                const message = "勤務先登録に失敗しました。"
                errorMessage(errRes, setError, setSnackbarStatus, message);

            })
    }

    return (
        <div>
            <input type="hidden" onClick={openDialog} ref={create} />
            <FormDialog
                open={dialogIsOpen}
                onClose={closeDialog}
                title="勤務先追加"
                buttonText="登録"
            >
                <form id="dialog-form" onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        required
                        fullWidth
                        margin='normal'
                        error={!!errors.name}
                        label="勤務先名"
                        helperText={errors.name?.message}
                        {...register("name")}
                    />
                </form>
            </FormDialog>
        </div>
    )
}

export default RegisterPlace;