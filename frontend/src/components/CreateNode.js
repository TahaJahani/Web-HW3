import { Button, Card, Divider, TextField } from '@mui/material'
import * as React from 'react'

function CreateNote() {
    return(
        <Card 
            variant='elevation' 
            sx={{padding: 2}} 
            elevation={2}
        >
            <TextField 
                label='Title' 
                variant='outlined' 
                margin='normal' 
                fullWidth />
            <TextField 
                label='Note here...' 
                variant='outlined' 
                multiline rows={4} 
                margin='normal' 
                fullWidth/>
            <Button variant='contained' sx={{float: 'right'}}>Submit</Button>
        </Card>
    )
}

export default CreateNote