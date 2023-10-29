import React, { useEffect } from 'react';
import { useForm, Controller, FormProvider } from 'react-hook-form';
import useAuthAxios from '../../hooks/auth/useAuthAxios';
import MultipleDateCalendar from '../../components/multipleDateCalendar';
import { useCustomContext } from '../../components/customContexts';
import { Button } from '@mui/material';
import DropdownSelect from '../../components/dropdownSelect';
import usePlaceSelect from '../../hooks/features/usePlaceSelect';
import useFetchPaidLeaveSchedules from '../../hooks/api/useFetchPaidLeaveSchedules';
import useFetchLeaveDays from '../../hooks/api/useFetchLeaveDays';
import urls from '../../api/urls';
import { errorMessage } from '../../utils/errorMessage';


const EditSchedule = () => {
  const { setSnackbarStatus } = useCustomContext();
  const authAxios = useAuthAxios();
  const useFormMethods = useForm();
  const { register, handleSubmit, control, setError, setValue, formState: { errors } } = useFormMethods;

  useFetchPaidLeaveSchedules();
  useFetchLeaveDays();

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
        <form onSubmit={handleSubmit(onSubmit)}>
          <MultipleDateCalendar />
          <Button variant='contained' type="submit">決定</Button>
        </form>
      </FormProvider>
    </div>
  )
}

export default EditSchedule;