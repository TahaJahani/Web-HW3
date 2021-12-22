import * as React from 'react';
import ReactDOM from 'react-dom';
import { TextField, Card, Button, Container, Paper, Stack, Typography, Divider } from '@mui/material';

function LoginPage() {
    return (
        <Container maxWidth="sm" alignItems="center" sx={{marginTop: 8}}>
            <Card variant='outlined' sx={{ paddingY: 6, paddingX: 4}}>
                <Typography variant='h5' sx={{ marginBottom: 6 }}>Login</Typography>
                <TextField variant='outlined' label='Username' fullWidth sx={{ marginBottom: 2 }} />
                <TextField variant='outlined' label='Password' fullWidth sx={{ marginBottom: 4 }} />
                <Button variant='contained' fullWidth>LOGIN</Button>
                <Divider sx={{ marginY: 2 }}>Or</Divider>
                <Button variant='outlined' fullWidth>REGISTER</Button>
            </Card>
        </Container>
    )
}

export default LoginPage