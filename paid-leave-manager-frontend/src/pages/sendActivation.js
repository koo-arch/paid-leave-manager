import React from 'react';
import CustomLink from '../components/customLink';
import { Typography } from '@mui/material';


const SendActivation = () => {
  return (
    <div>
        <Typography component={"h1"} variant="h3" sx={{ mt: 3 }}>
            仮登録完了
        </Typography>
        <Typography variant='body' sx={{ mt: 3 }}>
            メールを送信しました。メールに記載されているURLからアクティベーションを完了してください。<br/>
            メールが届かない場合は、<CustomLink to="/activate/resend">こちら</CustomLink>から再送信してください。
        </Typography>
    </div>
  )
}

export default SendActivation;