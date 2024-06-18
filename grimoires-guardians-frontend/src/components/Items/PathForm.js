import React, { useState, useEffect, useCallback } from 'react';
import { Box, TextField, Select, MenuItem, InputLabel, FormControl, Grid, IconButton } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import api from '../../services/api';

const PathForm = ({ file, onSave, gameId }) => {
    const [localFile, setLocalFile] = useState(() => ({
        ...file,
        data: {
            ...file.data,
            capacities: file.data.capacities && file.data.capacities.length >= 4 ? file.data.capacities : new Array(4).fill({ capacity: '' }),
        }
    }));
    const [capacities, setCapacities] = useState([]);

    useEffect(() => {
        setLocalFile(() => ({
            ...file,
            data: {
                ...file.data,
                capacities: file.data.capacities && file.data.capacities.length >= 4 ? file.data.capacities : new Array(4).fill({ capacity: '' }),
            }
        }));
    }, [file]);

    useEffect(() => {
        const fetchCapacities = async () => {
            try {
                const response = await api.get(`/api/game/${gameId}/items/capacities`);
                setCapacities(response.data.capacities.map(item => JSON.parse(item.data)));
            } catch (error) {
                console.error('Failed to fetch capacities', error);
            }
        };

        fetchCapacities();
    }, [gameId]);

    const handleChange = useCallback((key, value) => {
        setLocalFile(prevFile => {
            const updatedFile = {
                ...prevFile,
                data: { ...prevFile.data, [key]: value }
            };
            onSave(updatedFile);
            return updatedFile;
        });
    }, [onSave]);

    const handleCapacityChange = (index, value) => {
        const updatedCapacities = localFile.data.capacities.map((cap, i) => (
            i === index ? { ...cap, capacity: value } : cap
        ));
        handleChange('capacities', updatedCapacities);
    };

    const addCapacity = () => {
        handleChange('capacities', [...localFile.data.capacities, { capacity: '' }]);
    };

    const removeCapacity = (index) => {
        const updatedCapacities = localFile.data.capacities.filter((_, i) => i !== index);
        handleChange('capacities', updatedCapacities);
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
                value={localFile.data.name || ''}
                onChange={(e) => handleChange('name', e.target.value)}
            />
            <TextField
                margin="dense"
                label="Description"
                fullWidth
                multiline
                rows={4}
                value={localFile.data.description || ''}
                onChange={(e) => handleChange('description', e.target.value)}
            />
            {localFile.data.capacities.map((_, index) => (
                <Grid container spacing={2} alignItems="center" key={index}>
                    <Grid item xs={10}>
                        <FormControl fullWidth margin="dense">
                            <InputLabel id={`capacity-label-${index}`}>Capacité {index + 1}</InputLabel>
                            <Select
                                labelId={`capacity-label-${index}`}
                                value={localFile.data.capacities[index]?.capacity || ''}
                                onChange={(e) => handleCapacityChange(index, e.target.value)}
                            >
                                {capacities.map((capacity) => (
                                    <MenuItem key={capacity.id} value={capacity.name}>
                                        {capacity.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={2}>
                        <IconButton
                            color="secondary"
                            onClick={() => removeCapacity(index)}
                            disabled={localFile.data.capacities.length <= 4}
                        >
                            <RemoveCircleOutlineIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            ))}
            <IconButton color="primary" onClick={addCapacity}>
                <AddCircleOutlineIcon />
            </IconButton>
        </Box>
    );
};

export default PathForm;
