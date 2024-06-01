import React, { useState, useEffect } from 'react';
import { Box, TextField, Grid, Select, MenuItem, InputLabel, FormControl, IconButton } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import api from '../../services/api';

const ProfileForm = ({ file, onSave, gameId }) => {
    const [name, setName] = useState(file.name || '');
    const [description, setDescription] = useState(file.data?.description || '');
    const [adresse, setAdresse] = useState(file.data?.traits?.adresse || 0);
    const [esprit, setEsprit] = useState(file.data?.traits?.esprit || 0);
    const [puissance, setPuissance] = useState(file.data?.traits?.puissance || 0);
    const [paths, setPaths] = useState(file.data?.paths || [{ path: '' }, { path: '' }, { path: '' }]);
    const [availablePaths, setAvailablePaths] = useState([]);

    useEffect(() => {
        setName(file.name || '');
        setDescription(file.data?.description || '');
        setAdresse(file.data?.traits?.adresse || 0);
        setEsprit(file.data?.traits?.esprit || 0);
        setPuissance(file.data?.traits?.puissance || 0);
        setPaths(file.data?.paths || [{ path: '' }, { path: '' }, { path: '' }]);
    }, [file]);

    useEffect(() => {
        const fetchPaths = async () => {
            try {
                const response = await api.get(`/api/game/${gameId}/items/paths`);
                setAvailablePaths(response.data.paths.map(item => JSON.parse(item.data)));
            } catch (error) {
                console.error('Failed to fetch paths', error);
            }
        };

        fetchPaths();
    }, [gameId]);

    useEffect(() => {
        onSave({
            ...file,
            name,
            data: {
                ...file.data,
                description,
                traits: { adresse, esprit, puissance },
                paths
            }
        });
    }, [name, description, adresse, esprit, puissance, paths, file, onSave]);

    const handlePathChange = (index, value) => {
        const updatedPaths = paths.map((path, i) => (
            i === index ? { ...path, path: value } : path
        ));
        setPaths(updatedPaths);
    };

    const addPath = () => {
        setPaths([...paths, { path: '' }]);
    };

    const removePath = (index) => {
        const updatedPaths = paths.filter((_, i) => i !== index);
        setPaths(updatedPaths);
    };

    return (
        <Box>
            <TextField
                autoFocus
                margin="dense"
                label="Nom"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <TextField
                margin="dense"
                label="Description"
                fullWidth
                multiline
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <TextField
                        margin="dense"
                        label="Adresse"
                        type="number"
                        fullWidth
                        value={adresse}
                        onChange={(e) => setAdresse(parseInt(e.target.value, 10))}
                    />
                </Grid>
                <Grid item xs={4}>
                    <TextField
                        margin="dense"
                        label="Esprit"
                        type="number"
                        fullWidth
                        value={esprit}
                        onChange={(e) => setEsprit(parseInt(e.target.value, 10))}
                    />
                </Grid>
                <Grid item xs={4}>
                    <TextField
                        margin="dense"
                        label="Puissance"
                        type="number"
                        fullWidth
                        value={puissance}
                        onChange={(e) => setPuissance(parseInt(e.target.value, 10))}
                    />
                </Grid>
            </Grid>
            {paths.map((_, index) => (
                <Grid container spacing={2} alignItems="center" key={index}>
                    <Grid item xs={10}>
                        <FormControl fullWidth margin="dense">
                            <InputLabel id={`path-label-${index}`}>Voie {index + 1}</InputLabel>
                            <Select
                                labelId={`path-label-${index}`}
                                value={paths[index]?.path || ''}
                                onChange={(e) => handlePathChange(index, e.target.value)}
                            >
                                {availablePaths.map((path) => (
                                    <MenuItem key={path.id} value={path.name}>
                                        {path.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={2}>
                        <IconButton
                            color="secondary"
                            onClick={() => removePath(index)}
                            disabled={paths.length <= 3} // Empêche de supprimer en dessous de 3 chemins de base
                        >
                            <RemoveCircleOutlineIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            ))}
            <IconButton color="primary" onClick={addPath}>
                <AddCircleOutlineIcon />
            </IconButton>
        </Box>
    );
};

export default ProfileForm;
