import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import NavBar from './NavBar';
import api from '../services/api'; // Importer l'instance configurée d'Axios

const CreateGame = () => {
    const [gameName, setGameName] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const token = localStorage.getItem('token');
            const response = await api.post('/api/creer-partie', {
                name: gameName,
                description
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response.data);
            // Rediriger ou afficher un message de succès
        } catch (error) {
            console.error('Erreur lors de la création de la partie!', error);
        }
    };

    return (
        <>
            <NavBar />
            <Container maxWidth="sm">
                <Box mt={8}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Créer une Partie
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Nom de la Partie"
                            value={gameName}
                            onChange={(e) => setGameName(e.target.value)}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            fullWidth
                            margin="normal"
                            multiline
                            rows={4}
                        />
                        <Button type="submit" variant="contained" color="primary" fullWidth>
                            Créer
                        </Button>
                    </form>
                </Box>
            </Container>
        </>
    );
};

export default CreateGame;
