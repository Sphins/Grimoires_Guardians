import React, { useState, useEffect, useCallback } from 'react';
import { Box, TextField, Grid, Select, MenuItem, InputLabel, FormControl, IconButton } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import api from '../../services/api';

const ProfileForm = ({ file, onSave, gameId }) => {
    const [localFile, setLocalFile] = useState(() => ({
        ...file,
        data: {
            ...file.data,
            paths: file.data.paths && file.data.paths.length >= 3 ? file.data.paths : new Array(3).fill({ path: '' }),
            traits: {
                adresse: file.data?.traits?.adresse || 0,
                esprit: file.data?.traits?.esprit || 0,
                puissance: file.data?.traits?.puissance || 0,
            }
        }
    }));
    const [availablePaths, setAvailablePaths] = useState([]);

    useEffect(() => {
        setLocalFile(() => ({
            ...file,
            data: {
                ...file.data,
                paths: file.data.paths && file.data.paths.length >= 3 ? file.data.paths : new Array(3).fill({ path: '' }),
                traits: {
                    adresse: file.data?.traits?.adresse || 0,
                    esprit: file.data?.traits?.esprit || 0,
                    puissance: file.data?.traits?.puissance || 0,
                }
            }
        }));
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

    const handleChange = useCallback((key, value) => {
        setLocalFile(prevFile => {
            const updatedFile = {
                ...prevFile,
                data: {
                    ...prevFile.data,
                    [key]: value,
                }
            };
            onSave(updatedFile);
            return updatedFile;
        });
    }, [onSave]);

    const handleTraitChange = (traitKey, value) => {
        setLocalFile(prevFile => {
            const updatedFile = {
                ...prevFile,
                data: {
                    ...prevFile.data,
                    traits: {
                        ...prevFile.data.traits,
                        [traitKey]: value,
                    }
                }
            };
            onSave(updatedFile);
            return updatedFile;
        });
    };

    const handlePathChange = (index, value) => {
        const updatedPaths = localFile.data.paths.map((path, i) => (
            i === index ? { ...path, path: value } : path
        ));
        handleChange('paths', updatedPaths);
    };

    const addPath = () => {
        handleChange('paths', [...localFile.data.paths, { path: '' }]);
    };

    const removePath = (index) => {
        const updatedPaths = localFile.data.paths.filter((_, i) => i !== index);
        handleChange('paths', updatedPaths);
    };

    useEffect(() => {
        // Notify the parent component about the changes when localFile changes
        onSave(localFile);
    }, [localFile, onSave]);

    return (
        <Box>
            <TextField
                autoFocus
                margin="dense"
                label="Nom"
                fullWidth
                value={localFile.name || ''}
                onChange={(e) => handleChange('name', e.target.value)}
            />
            <TextField
                margin="dense"
                label="Description"
                fullWidth
                multiline
                rows={4}
                value={localFile.data?.description || ''}
                onChange={(e) => handleChange('description', e.target.value)}
            />
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <TextField
                        margin="dense"
                        label="Adresse"
                        type="number"
                        fullWidth
                        value={localFile.data?.traits?.adresse || 0}
                        onChange={(e) => handleTraitChange('adresse', parseInt(e.target.value, 10))}
                    />
                </Grid>
                <Grid item xs={4}>
                    <TextField
                        margin="dense"
                        label="Esprit"
                        type="number"
                        fullWidth
                        value={localFile.data?.traits?.esprit || 0}
                        onChange={(e) => handleTraitChange('esprit', parseInt(e.target.value, 10))}
                    />
                </Grid>
                <Grid item xs={4}>
                    <TextField
                        margin="dense"
                        label="Puissance"
                        type="number"
                        fullWidth
                        value={localFile.data?.traits?.puissance || 0}
                        onChange={(e) => handleTraitChange('puissance', parseInt(e.target.value, 10))}
                    />
                </Grid>
            </Grid>
            {localFile.data.paths.map((_, index) => (
                <Grid container spacing={2} alignItems="center" key={index}>
                    <Grid item xs={10}>
                        <FormControl fullWidth margin="dense">
                            <InputLabel id={`path-label-${index}`}>Voie {index + 1}</InputLabel>
                            <Select
                                labelId={`path-label-${index}`}
                                value={localFile.data.paths[index]?.path || ''}
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
                            disabled={localFile.data.paths.length <= 3}
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
