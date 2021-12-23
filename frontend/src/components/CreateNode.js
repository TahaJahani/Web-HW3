import { Button, Card, Container, Box, Radio, TextField, Typography } from '@mui/material'
import * as React from 'react'
import theme from '../themes/mainTheme'
import colors from '../data/colors'

function CreateNote({ onSubmit }) {

    const [title, setTitle] = React.useState()
    const [body, setBody] = React.useState()
    const [color, setColor] = React.useState("#ffffff")

    const sumbitClicked = () => {
        onSubmit({ title, body, color })
        setTitle('')
        setBody('')
        setColor('#ffffff')
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