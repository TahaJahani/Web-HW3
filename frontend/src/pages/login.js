import * as React from 'react';
import { TextField, Card, Button, Container, Paper, Stack, Typography, Divider } from '@mui/material';
const axios = require('axios')

function LoginPage() {

    const [username, setUsername] = React.useState();
    const [password, setPassword] = React.useState();
    const [error, setError] = React.useState();

    const loginClicked = async () => {
        let options = {
            method: 'post',
            url: 'http://localhost:3030/api/users/login',
            data: {
                username: username,
                password: password,
            },
        }
        axios(options)
            .then((res) => {
                console.log(res.data.result.token)
            }, (err) => {
                setError(err.response.data.message)
            })
    }

    return (
        <Container maxWidth="sm" alignItems="center" sx={{ marginTop: 8 }}>
            <Card variant='outlined' sx={{ paddingY: 6, paddingX: 4 }}>
                <Typography variant='h5' sx={{ marginBottom: 6 }}>Login</Typography>
                <TextField
                    variant='outlined'
                    label='Username'
                    fullWidth
                    onChange={(val) => setUsername(val.target.value)}
                    sx={{ marginBottom: 2 }} />
                <TextField
                    variant='outlined'
                    label='Password'
                    fullWidth
                    onChange={(val) => setPassword(val.target.value)}
                    sx={{ marginBottom: 2 }} />
                <Typography 
                    color='error' 
                    sx={{marginBottom: 4}}>
                    {error}
                </Typography>
                <Button variant='contained' fullWidth onClick={loginClicked}>LOGIN</Button>
                <Divider sx={{ marginY: 2 }}>Or</Divider>
                <Button variant='outlined' fullWidth>REGISTER</Button>
            </Card>
        </Container>
    )
}

export default LoginPage