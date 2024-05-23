import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from '../services/api'; // Mettre à jour le chemin d'importation

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await api.post('/login', { // Utiliser l'instance configurée d'Axios
                email,
                password
            });
            console.log(response.data);
            // Store the token (localStorage, context, etc.)
            localStorage.setItem('token', response.data.token.token);
            navigate('/home'); // Redirigez vers l'écran d'accueil
        } catch (error) {
            console.error('There was an error logging in!', error);
        }
    };

    return (
        <Container maxWidth="xs">
            <Box mt={8}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Login
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        fullWidth
                        margin="normal"
                        type="email"
                    />
                    <TextField
                        label="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        fullWidth
                        margin="normal"
                        type="password"
                    />
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        Login
                    </Button>
                </form>
                <Box mt={2}>
                    <Typography variant="body2">
                        Vous n'avez pas de compte ? <Link href="/register">Enregistrez-vous</Link>
                    </Typography>
                </Box>
            </Box>
        </Container>
    );
};

export default Login;
