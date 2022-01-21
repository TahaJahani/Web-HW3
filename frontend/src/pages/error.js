import * as React from 'react';
import { TextField, Card, Button, Container, Paper, Stack, Typography, Divider } from '@mui/material';
const axios = require('axios')

function ErrorPage() {

    return (
        <Container maxWidth="sm" alignItems="center" sx={{ marginTop: 8, textAlign: 'center' }}>
            <Typography variant='h1'>
                409
            </Typography>
            <Typography variant='h5'>
                Too many requests! Please wait for a while...
            </Typography>
        </Container>
    )
}

export default ErrorPage