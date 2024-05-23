import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, List, ListItem, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import NavBar from './NavBar';
import api from '../services/api'; // Importer l'instance configurée d'Axios

const JoinGame = () => {
    const [mjGames, setMjGames] = useState([]);
    const [playerGames, setPlayerGames] = useState([]);

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

        const fetchPlayerGames = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await api.get('/api/mes-parties-joueur', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setPlayerGames(response.data.data);
            } catch (error) {
                console.error('Error fetching player games:', error);
            }
        };

        fetchMjGames();
        fetchPlayerGames();
    }, []);

    return (
        <>
            <NavBar />
            <Container maxWidth="sm">
                <Box mt={8}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Rejoindre une Partie
                    </Typography>
                    <Box mt={4}>
                        <Typography variant="h5" component="h2" gutterBottom>
                            Parties en tant que Maître de Jeu
                        </Typography>
                        <List>
                            {mjGames.map((game) => (
                                <ListItem button component={Link} to={`/jeu/${game.id}`} key={game.id}>
                                    <ListItemText primary={game.name} secondary={game.description} />
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                    <Box mt={4}>
                        <Typography variant="h5" component="h2" gutterBottom>
                            Parties en tant que Joueur
                        </Typography>
                        <List>
                            {playerGames.map((game) => (
                                <ListItem button component={Link} to={`/jeu/${game.id}`} key={game.id}>
                                    <ListItemText primary={game.name} secondary={game.description} />
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                </Box>
            </Container>
        </>
    );
};

export default JoinGame;
