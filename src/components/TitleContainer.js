import { Button, Grid, Typography } from '@mui/material'
import React from 'react'

const TitleContainer = ({ title, onAddClick }) => {
    return (
        <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
        >
            <Typography variant='h5'>
                {title}
            </Typography>
            <Button variant="outlined" onClick={onAddClick} size="small" sx={{ px:5 }}>Add</Button>
        </Grid>
    )
}

export default TitleContainer