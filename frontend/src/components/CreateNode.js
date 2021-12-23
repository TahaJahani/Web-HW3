import { Button, Card, Container, Box, Radio,TextField } from '@mui/material'
import * as React from 'react'

function CreateNote({onSubmit}) {

    const [title, setTitle] = React.useState()
    const [body, setBody] = React.useState()
    const [color, setColor] = React.useState("#ffffff")

    const sumbitClicked = () => {
        onSubmit({title, body, color})
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
            <Box>
                <Box>
                    {/* todo */}
                    {/* <Radio
                        checked={color === '#ffee33'}
                        onChange={() => setColor('#ffee33')}
                        value="#ffee33"
                        color='#ffee33'
                        name="radio-buttons"
                    />
                    <Radio
                        checked={color === '#000000'}
                        onChange={() => setColor('#ffee33')}
                        value="b"
                        name="radio-buttons"
                    /> */}
                </Box>
                <Button variant='contained' sx={{ float: 'right' }} onClick={sumbitClicked}>Submit</Button>
            </Box>
        </Card>
    )
}

export default CreateNote