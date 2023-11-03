import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import useAuthAxios from '../../hooks/auth/useAuthAxios';
import { useCustomContext } from '../../components/customContexts';
import FormDialog from '../../components/formDialog';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton, DialogContentText } from '@mui/material';
import { errorMessage } from '../../utils/errorMessage';
import urls from '../../api/urls';


const DeletePlace = (props) => {
    const { id } = props;
    const { handleSubmit, reset, setError } = useForm();
    const authAxios = useAuthAxios();
    const [dialogIsOpen, setDialogIsOpen] = useState(false);
    const { postFlag, setPostFlag, setSnackbarStatus } = useCustomContext();

    const openDialog = () => setDialogIsOpen(true);
    const closeDialog = () => setDialogIsOpen(false);

    const deletePlace = async () => {
        return await authAxios.delete(urls.LeaveDays + id + '/');
    }

    const onSubmit = () => {
        deletePlace()
            .then(res => {
                setSnackbarStatus({
                    open: true,
                    severity: "success",
                    message: "有給情報削除が完了しました。"
                });
                setPostFlag(!postFlag);
                closeDialog();
                reset();
            })
            .catch(err => {
                const errRes = err.response.data
                const message = "有給情報削除に失敗しました。"
                errorMessage(errRes, setError, setSnackbarStatus, message);
            })
    }
    return (
        <div>
            <IconButton color="error" onClick={openDialog}>
                <DeleteIcon />
            </IconButton>
            <FormDialog
                open={dialogIsOpen}
                onClose={closeDialog}
                title="勤務先削除"
                buttonText="削除"
                color="error"
            >
                <form id="dialog-form" onSubmit={handleSubmit(onSubmit)}>
                    <DialogContentText>
                        勤務先を削除します。よろしいですか？
                    </DialogContentText>
                </form>
            </FormDialog>
        </div>
    )
}

export default DeletePlace;