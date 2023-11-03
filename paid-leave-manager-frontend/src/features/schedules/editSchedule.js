import React, { useState } from 'react';
import { format } from 'date-fns';
import { useForm, FormProvider } from 'react-hook-form';
import useAuthAxios from '../../hooks/auth/useAuthAxios';
import MultipleDateCalendar from '../../features/schedules/multipleDateCalendar';
import { useCustomContext } from '../../components/customContexts';
import FormDialog from '../../components/formDialog';
import urls from '../../api/urls';
import { errorMessage } from '../../utils/errorMessage';
import { 
  Button,
  List,
  ListItem,
  ListItemText,
  DialogContentText
 } from '@mui/material';


const EditSchedule = () => {
  const { setSnackbarStatus } = useCustomContext();
  const authAxios = useAuthAxios();
  const useFormMethods = useForm();
  const { handleSubmit, setError, getValues } = useFormMethods;

  // ダイアログ開閉
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const openDialog = () => setDialogIsOpen(true);
  const closeDialog = () => setDialogIsOpen(false);

  const [isPlaceSelected, setIsPlaceSelected] = useState(false);
  const [isDaysChanged, setIsDaysChanged] = useState(false);

  const postPaidLeave = async (data) => {
    return await authAxios.post(urls.PaidLeaveSchedule, data)
  }

  const onSubmit = (data) => {
    console.log(data);
    postPaidLeave(data)
      .then((res) => {
        console.log(res.data);
        setSnackbarStatus({
          open: true,
          severity: 'success',
          message: '有給情報を登録しました。'
        });
        closeDialog();
      })
      .catch((err) => {
        console.log(err.response.data);
        const errRes = err.response.data;
        const message = "有給情報登録に失敗しました。"
        errorMessage(errRes, setError, setSnackbarStatus, message);
      })
  }
  return (
    <div>
      <FormProvider {...useFormMethods}>
        <form id="dialog-form" onSubmit={handleSubmit(onSubmit)}>
          <MultipleDateCalendar 
            updatePlaceStatus={setIsPlaceSelected} 
            updateDaysStatus={setIsDaysChanged}
          />
        </form>
        <Button
          size='large'
          fullWidth
          variant='contained' 
          onClick={openDialog}
          disabled={!(isPlaceSelected && isDaysChanged)}
          sx={{ mt: 3, mb: 2 }}
          >
            確認
        </Button>
        <FormDialog
          open={dialogIsOpen}
          onClose={closeDialog}
          title="登録確認"
          buttonText="登録"
        >
          <List>
            <ListItem>
              <ListItemText primary="場所" secondary={getValues('place_name')} />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="有給消化日" 
                secondary={
                  <>
                    {getValues('leave_dates') ? 
                      getValues('leave_dates')
                      .sort((a, b) => new Date(a) - new Date(b))
                      .map((date, index) => (
                        <span key={index} style={{ display: 'block' }}>{format(new Date(date), "yyyy年MM月dd日")}</span>
                      ))
                    : null}
                  </>
                }
              />
            </ListItem>
          </List>
          <DialogContentText color="error">
            上記に記載のない登録済み有給消化日は削除されます。<br/>
            この内容で登録しますか？
          </DialogContentText>
        </FormDialog>
      </FormProvider>
    </div>
  )
}

export default EditSchedule;