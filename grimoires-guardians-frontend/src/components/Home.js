import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import NavBar from './NavBar';

const Home = () => {
    return (
        <>
            <NavBar />
            <Container maxWidth="sm">
                <Box mt={8}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Bienvenue dans Grimoires Guardians
                    </Typography>
                </Box>
            </Container>
        </>
    );
};

export default Home;
