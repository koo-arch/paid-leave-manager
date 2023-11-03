import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Container, Typography, Grid, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const TableField = (props) => {
    const { rows, columns, title, openDialog,  message = "" } = props;

    return (
        <Box sx={{ mb: 4 }}>
            <Container>
                <Grid container sx={{ mt: 3, mb: 2 }}>
                    <Grid item>
                        <Typography component={"h2"} variant='h5' sx={{ mt: 1 }}>
                            {title}
                        </Typography>
                    </Grid>
                    <Grid item sx={{ marginLeft: 'auto', mb: 2, }}>
                        <Fab
                            variant="extended"
                            size="medium"
                            color="primary"
                            aria-label="add"
                            onClick={openDialog}
                        >
                            <AddIcon />
                            追加
                        </Fab>
                    </Grid>
                </Grid>
                {
                    rows.length === 0 ?
                    <Typography variant='h6' sx={{ mt: 1 }}>
                        {message}
                    </Typography>
                    :
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        disableColumnMenu
                        sx={{ mb: 10 }}
                    />
                }
            </Container>
        </Box>
    )
}

export default TableField;