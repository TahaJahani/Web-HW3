import * as React from 'react';
import ReactDOM from 'react-dom';
import { TextField, Card, Button, Container, Paper, Stack, Typography, Divider, ButtonGroup, colors, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function Note(props) {
    const {title, body, color, onClose, onDelete, onEdit} = props;
    return(
        <Card variant="elevation" sx={{backgroundColor: color, margin: 2}}>
            <IconButton sx={{float: "right"}} onClick={onClose}>
                <CloseIcon />
            </IconButton>
            <Typography variant='h6' sx={{m: 2}}>
                {title}
            </Typography>
            <Divider margin='normal'/>
            <Typography sx={{m: 2, height: 100}} margin='normal'>
                {body}
            </Typography>
            <Divider variant='fullWidth'/>
            <ButtonGroup variant='outlined' size='small' sx={{m: 2, float: 'right'}}>
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