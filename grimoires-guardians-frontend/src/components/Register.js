import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api'; // Importer l'instance configurée d'Axios

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await api.post('/register', { // Utiliser l'instance configurée d'Axios
                username,
                email,
                password
            });
            console.log(response.data);
            navigate('/login'); // Redirigez vers l'écran de connexion
        } catch (error) {
            console.error('There was an error registering!', error);
        }
    };

    return (
        <Container maxWidth="xs">
            <Box mt={8}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Register
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
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
                        Register
                    </Button>
                </form>
                <Box mt={2}>
                    <Typography variant="body2">
                        Vous avez déjà un compte ? <Link to="/login">Connectez-vous</Link>
                    </Typography>
                </Box>
            </Box>
        </Container>
    );
};

export default Register;
