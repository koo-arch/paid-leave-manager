import React, { memo, useEffect, useState } from 'react';
import { 
    Card,
    CardContent,
    Divider,
    Typography,
 } from '@mui/material';
import { format } from 'date-fns';


const LeaveInfo = ({data}) => {
    console.log(data);
    return (
        <div>
            <Card style={{ marginBottom: 10 }}>
                {data.map((item, index) => (
                    <CardContent key={item.id}>
                        <Typography variant="h6">
                            {format(new Date(item.effective_date), 'yyyy年MM月dd日')}~{format(new Date(item.deadline), 'yyyy年MM月dd日')}
                        </Typography>
                        <Typography component={"div"}variant="body" style={{ textAlign: 'center' }}>
                            <span style={{ fontSize: '0.8rem' }}>残り </span>
                            <span style={{ fontSize: '2rem' }}>{item.left_days}</span>
                            <span style={{ fontSize: '0.8rem' }}> 日</span>
                        </Typography>
                        {index !== data.length - 1 && <Divider />}
                    </CardContent>
                ))}
            </Card>
        </div>
    );
}

export default memo(LeaveInfo);