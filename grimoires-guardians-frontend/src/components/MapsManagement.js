import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Paper, Tooltip } from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import api from '../services/api';

const MapsManagement = ({ gameId, setFilePath }) => {
    const [maps, setMaps] = useState([]);
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState(null);
    const [selectedMap, setSelectedMap] = useState(null);

    useEffect(() => {
        const fetchMaps = async () => {
            try {
                const response = await api.get(`/api/games/${gameId}/maps`);
                setMaps(response.data);
            } catch (error) {
                console.error('Failed to fetch maps', error);
            }
        };

        fetchMaps();
    }, [gameId]);

    const handleOpen = (map = null) => {
        if (map) {
            setName(map.name);
            setDescription(map.description);
            setSelectedMap(map);
        } else {
            setName('');
            setDescription('');
            setFile(null);
            setSelectedMap(null);
        }
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSave = async () => {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        if (file) formData.append('file', file);
        formData.append('type', 'maps');
        formData.append('game_id', gameId);

        try {
            let response;
            if (selectedMap && selectedMap.id) {
                // Mise à jour
                response = await api.put(`/api/maps/${selectedMap.id}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
            } else {
                // Création
                response = await api.post('/api/maps', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
            }
            setMaps(selectedMap ? maps.map(m => m.id === selectedMap.id ? response.data.map : m) : [...maps, response.data.map]);
            handleClose();
        } catch (error) {
            console.error('Failed to save map', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await api.delete(`/api/maps/${id}`);
            setMaps(maps.filter((map) => map.id !== id));
        } catch (error) {
            console.error('Failed to delete map', error);
        }
    };

    const handleClick = (map) => {
        setFilePath(`${process.env.REACT_APP_IMAGE_BASE_URL}/maps/${map.file_path}`);
    };

    const handleCtrlClick = (e, map) => {
        if (e.ctrlKey) {
            handleOpen(map);
        } else {
            handleClick(map);
        }
    };

    return (
        <Box>
            <Paper style={{ padding: 16, marginBottom: 16, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                <Tooltip title="Ajouter Carte">
                    <IconButton color="secondary" onClick={() => handleOpen(null)}>
                        <AddIcon />
                    </IconButton>
                </Tooltip>
            </Paper>
            <List>
                {maps.map((map) => (
                    <ListItem key={map.id} onClick={(e) => handleCtrlClick(e, map)}>
                        <ListItemText primary={map.name} secondary={map.description} />
                        <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(map.id)}>
                                <DeleteIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{selectedMap ? 'Update Map' : 'Add Map'}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Name"
                        fullWidth
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="Description"
                        fullWidth
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <input type="file" accept="image/*,video/*" onChange={handleFileChange} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSave} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default MapsManagement;
