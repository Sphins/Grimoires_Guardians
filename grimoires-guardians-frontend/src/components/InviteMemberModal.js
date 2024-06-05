import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, TextField, List, ListItem, ListItemText, IconButton } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import DeleteIcon from '@mui/icons-material/Delete';
import api from '../services/api';

const InviteMemberModal = ({ open, onClose, gameId }) => {
    const [searchResults, setSearchResults] = useState([]);
    const [currentMembers, setCurrentMembers] = useState([]);

    useEffect(() => {
        if (open) {
            fetchCurrentMembers();
        }
    }, [open]);

    const fetchCurrentMembers = async () => {
        try {
            const response = await api.get(`/api/game/${gameId}/members`);
            setCurrentMembers(response.data.members);
        } catch (error) {
            console.error('Failed to fetch current members', error);
        }
    };

    const handleSearch = async (query) => {
        try {
            const response = await api.get(`/api/users/search?q=${query}`);
            setSearchResults(response.data.users);
        } catch (error) {
            console.error('Failed to search users', error);
        }
    };

    const handleAddUser = async (userId) => {
        try {
            await api.post(`/api/game/${gameId}/add-user`, { userId });
            fetchCurrentMembers();
        } catch (error) {
            console.error('Failed to add user', error);
        }
    };

    const handleRemoveUser = async (userId) => {
        try {
            await api.delete(`/api/game/${gameId}/remove-user/${userId}`);
            fetchCurrentMembers();
        } catch (error) {
            console.error('Failed to remove user', error);
        }
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box p={4} bgcolor="white" borderRadius={2} maxWidth={600} mx="auto" my="20vh">
                <Typography variant="h6" mb={2}>Inviter un Membre à la Partie</Typography>
                <Autocomplete
                    freeSolo
                    options={searchResults.map((user) => user.username)}
                    onInputChange={(event, newInputValue) => handleSearch(newInputValue)}
                    renderInput={(params) => (
                        <TextField {...params} label="Rechercher des Membres" fullWidth />
                    )}
                />
                <List>
                    {searchResults.map(user => (
                        <ListItem key={user.id} button onClick={() => handleAddUser(user.id)}>
                            <ListItemText primary={user.username} />
                        </ListItem>
                    ))}
                </List>
                <Typography variant="h6" mt={4}>Membres Actuels</Typography>
                <List>
                    {currentMembers.map(user => (
                        <ListItem key={user.id}>
                            <ListItemText primary={user.username} />
                            <IconButton edge="end" aria-label="delete" onClick={() => handleRemoveUser(user.id)}>
                                <DeleteIcon />
                            </IconButton>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Modal>
    );
};

export default InviteMemberModal;
