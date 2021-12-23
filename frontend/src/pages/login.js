import * as React from 'react';
import { TextField, Card, Button, Container, Paper, Stack, Typography, Divider } from '@mui/material';
import { useRecoilState } from 'recoil'
import { useNavigate } from 'react-router-dom';
import {userState} from '../state/userAtom'
import {tokenState} from '../state/tokenAtom'
const axios = require('axios')

function LoginPage() {
    const navigate = useNavigate()
    const [user, setUser] = useRecoilState(userState)
    const [token, setToken] = useRecoilState(tokenState)
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
                setToken(res.data.result.token)
                setUser(res.data.result.user)
                navigate('/notes')
            }, (err) => {
                setError(err.response.data.message)
            })
    }

    const registerClicked = async () => {
        let options = {
            method: 'post',
            url: 'http://localhost:3030/api/users/register',
            data: {
                username: username,
                password: password,
            },
        }
        axios(options)
            .then((res) => {

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
                <Button variant='outlined' fullWidth onClick={registerClicked}>REGISTER</Button>
            </Card>
        </Container>
    )
}

export default LoginPage