import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, List, ListItem, ListItemText, Button, TextField } from '@mui/material';
import NavBar from './NavBar';
import api from '../services/api'; // Importer l'instance configurée d'Axios

const ManageGames = () => {
    const [mjGames, setMjGames] = useState([]);
    const [editGameId, setEditGameId] = useState(null);
    const [editGameName, setEditGameName] = useState('');
    const [editGameDescription, setEditGameDescription] = useState('');

    useEffect(() => {
        const fetchMjGames = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await api.get('/api/mes-parties-mj', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setMjGames(response.data.data);
            } catch (error) {
                console.error('Error fetching MJ games:', error);
            }
        };

        fetchMjGames();
    }, []);

    const handleDelete = async (gameId) => {
        console.log(`Attempting to delete game with id ${gameId}`);
        try {
            const token = localStorage.getItem('token');
            await api.delete(`/api/supprimer-partie/${gameId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setMjGames(mjGames.filter(game => game.id !== gameId));
            alert('Partie supprimée avec succès');
        } catch (error) {
            console.error('Error deleting game:', error.response.data);
            alert('Erreur lors de la suppression de la partie');
        }
    };

    const handleEdit = (game) => {
        setEditGameId(game.id);
        setEditGameName(game.name);
        setEditGameDescription(game.description);
    };

    const handleUpdate = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await api.put(`/api/update-partie/${editGameId}`, {
                name: editGameName,
                description: editGameDescription
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setMjGames(mjGames.map(game => game.id === editGameId ? response.data.data : game));
            setEditGameId(null);
            alert('Partie mise à jour avec succès');
        } catch (error) {
            console.error('Error updating game:', error.response.data);
            alert('Erreur lors de la mise à jour de la partie');
        }
    };

    return (
        <>
            <NavBar />
            <Container maxWidth="sm">
                <Box mt={8}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Gérer les Parties
                    </Typography>
                    <List>
                        {mjGames.map((game) => (
                            <ListItem key={game.id}>
                                <ListItemText primary={game.name} secondary={game.description} />
                                <Box sx={{ display: 'flex', gap: 1 }}>
                                    <Button variant="contained" color="secondary" onClick={() => handleDelete(game.id)}>
                                        Supprimer
                                    </Button>
                                    <Button variant="contained" color="primary" onClick={() => handleEdit(game)}>
                                        Modifier
                                    </Button>
                                </Box>
                            </ListItem>
                        ))}
                    </List>
                    {editGameId && (
                        <Box mt={4}>
                            <Typography variant="h5" component="h2" gutterBottom>
                                Modifier la Partie
                            </Typography>
                            <TextField
                                label="Nom de la Partie"
                                value={editGameName}
                                onChange={(e) => setEditGameName(e.target.value)}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Description de la Partie"
                                value={editGameDescription}
                                onChange={(e) => setEditGameDescription(e.target.value)}
                                fullWidth
                                margin="normal"
                            />
                            <Box sx={{ display: 'flex', gap: 1 }}>
                                <Button variant="contained" color="primary" onClick={handleUpdate}>
                                    Enregistrer les Modifications
                                </Button>
                                <Button variant="contained" color="secondary" onClick={() => setEditGameId(null)}>
                                    Annuler
                                </Button>
                            </Box>
                        </Box>
                    )}
                </Box>
            </Container>
        </>
    );
};

export default ManageGames;
