import React, { useState } from 'react';
import { Container, Typography, Box, TextField, Button } from '@mui/material';
import NavBar from './NavBar';
import api from '../services/api'; // Importer l'instance configurée d'Axios

const ManageAccount = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleUpdateUsername = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await api.put('/api/update-username', { username }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response.data);
            alert('Pseudo mis à jour avec succès');
        } catch (error) {
            console.error('Erreur lors de la mise à jour du pseudo', error);
            alert('Erreur lors de la mise à jour du pseudo');
        }
    };

    const handleUpdateEmail = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await api.put('/api/update-email', { email }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response.data);
            alert('Adresse e-mail mise à jour avec succès');
        } catch (error) {
            console.error('Erreur lors de la mise à jour de l\'adresse e-mail', error);
            alert('Erreur lors de la mise à jour de l\'adresse e-mail');
        }
    };

    const handleUpdatePassword = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await api.put('/api/update-password', { password }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response.data);
            alert('Mot de passe mis à jour avec succès');
        } catch (error) {
            console.error('Erreur lors de la mise à jour du mot de passe', error);
            alert('Erreur lors de la mise à jour du mot de passe');
        }
    };

    return (
        <>
            <NavBar />
            <Container maxWidth="sm">
                <Box mt={8}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Gérer le Compte
                    </Typography>
                    <Box mt={4}>
                        <Typography variant="h5" component="h2" gutterBottom>
                            Modifier le Pseudo
                        </Typography>
                        <TextField
                            label="Nouveau Pseudo"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            fullWidth
                            margin="normal"
                        />
                        <Button variant="contained" color="primary" onClick={handleUpdateUsername}>
                            Mettre à jour le Pseudo
                        </Button>
                    </Box>
                    <Box mt={4}>
                        <Typography variant="h5" component="h2" gutterBottom>
                            Modifier l'Adresse E-mail
                        </Typography>
                        <TextField
                            label="Nouvelle Adresse E-mail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            fullWidth
                            margin="normal"
                            type="email"
                        />
                        <Button variant="contained" color="primary" onClick={handleUpdateEmail}>
                            Mettre à jour l'Adresse E-mail
                        </Button>
                    </Box>
                    <Box mt={4}>
                        <Typography variant="h5" component="h2" gutterBottom>
                            Modifier le Mot de Passe
                        </Typography>
                        <TextField
                            label="Nouveau Mot de Passe"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            fullWidth
                            margin="normal"
                            type="password"
                        />
                        <Button variant="contained" color="primary" onClick={handleUpdatePassword}>
                            Mettre à jour le Mot de Passe
                        </Button>
                    </Box>
                </Box>
            </Container>
        </>
    );
};

export default ManageAccount;
