import { Button, Card, Container, Box, Radio, TextField, Typography } from '@mui/material'
import * as React from 'react'
import theme from '../themes/mainTheme'
import colors from '../data/colors'

function CreateNote({ note ,onSubmit }) {
    if (!note)
        note = {id: 0, title: '', body: '', color: '#ffffff'}
    const [title, setTitle] = React.useState(note.title)
    const [body, setBody] = React.useState(note.body)
    const [color, setColor] = React.useState(note.color)

    const sumbitClicked = () => {
        setTitle('')
        setBody('')
        setColor('#ffffff')
        let id = note.id
        onSubmit({ id, title, body, color })
    }

    return (
        <Card
            variant='elevation'
            sx={{ padding: 2 }}
            elevation={2}
        >
            <TextField
                label='Title'
                variant='outlined'
                margin='normal'
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                fullWidth />
            <TextField
                label='Note here...'
                variant='outlined'
                multiline rows={4}
                margin='normal'
                value={body}
                onChange={(e) => setBody(e.target.value)}
                fullWidth />
            <Box sx={{mt: 2}}>
                <Typography component='span' color='grey'>
                    Color
                </Typography>
                {colors.map((item, i) => (
                    <Radio
                        checked={color === item.code}
                        onChange={() => setColor(item.code)}
                        value={item.code}
                        theme={theme}
                        color={item.name}
                        name="colors"
                    />
                ))}
                <Button variant='contained' sx={{ float: 'right' }} onClick={sumbitClicked}>Submit</Button>
            </Box>
        </Card>
    )
}

export default CreateNote