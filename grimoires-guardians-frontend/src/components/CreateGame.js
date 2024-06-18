import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';
import api from '../services/api'; // Importer l'instance configurée d'Axios

const CreateGame = () => {
    const [gameName, setGameName] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

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
            setSuccess('Partie créée avec succès!');
            // Rediriger vers une autre page ou réinitialiser le formulaire
            setGameName('');
            setDescription('');
            setError('');
            // Rediriger vers la page d'accueil ou de gestion des parties après un délai
            setTimeout(() => {
                navigate('/rejoindre-partie');
            }, 2000);
        } catch (error) {
            console.error('Erreur lors de la création de la partie!', error);
            setError('Erreur lors de la création de la partie. Veuillez réessayer.');
            setSuccess('');
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
                    {error && <Typography color="error">{error}</Typography>}
                    {success && <Typography color="primary">{success}</Typography>}
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
