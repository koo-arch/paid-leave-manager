import React, { memo, useEffect, useState } from 'react';
import { 
    Card,
    CardContent,
    List,
    ListItem,
    ListItemText,
    Typography
 } from '@mui/material';
import { format } from 'date-fns';


const LeaveInfo = ({data}) => {
    console.log(data);
    return (
        <div>
            <Card style={{ marginBottom: 10 }}>
                {data.map((item) => (
                    <CardContent key={item.id}>
                        <Typography variant="h6">
                            {format(new Date(item.effective_date), 'yyyy年MM月dd日')}から
                        </Typography>
                        <List>
                            <ListItem>
                                <ListItemText primary={item.left_days} />
                            </ListItem>
                        </List>
                    </CardContent>
                ))}
            </Card>
        </div>
    );
}

export default memo(LeaveInfo);