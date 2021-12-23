import * as React from 'react';
import ReactDOM from 'react-dom';
import { TextField, Card, Button, Container, Paper, Stack, Typography, Divider, ButtonGroup, colors } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function Note(props) {
    const {title, body, color} = props;
    return(
        <Card variant="elevation" sx={{backgroundColor: color, margin: 2, padding: 2}}>
            <Typography variant='h6'>
                {title}
            </Typography>
            <Divider />
            <p>
                {body}
            </p>
            <ButtonGroup variant='outlined' size='small'>
                <Button color='primary'>
                    <EditIcon />
                </Button>
                <Button color='error'>
                    <DeleteIcon/>
                </Button>
            </ButtonGroup>
        </Card>
    )
}

export default Note;