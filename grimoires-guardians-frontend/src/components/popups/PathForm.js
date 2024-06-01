import React, { useState, useEffect } from 'react';
import { Box, TextField, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import api from '../../services/api';

const PathForm = ({ file, onSave, gameId }) => {
    const [name, setName] = useState(file.data.name || '');
    const [description, setDescription] = useState(file.data.description || '');
    const [capacities, setCapacities] = useState([]);
    const [selectedCapacities, setSelectedCapacities] = useState(file.data.capacities || [
        { capacity: '' },
        { capacity: '' },
        { capacity: '' },
        { capacity: '' }
    ]);

    useEffect(() => {
        setName(file.data.name || '');
        setDescription(file.data.description || '');
        setSelectedCapacities(file.data.capacities || [
            { capacity: '' },
            { capacity: '' },
            { capacity: '' },
            { capacity: '' }
        ]);
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

    useEffect(() => {
        onSave({ ...file, data: { ...file.data, name, description, capacities: selectedCapacities } });
    }, [name, description, selectedCapacities, file, onSave]);

    const handleCapacityChange = (index, value) => {
        const updatedCapacities = selectedCapacities.map((cap, i) => (
            i === index ? { ...cap, capacity: value } : cap
        ));
        setSelectedCapacities(updatedCapacities);
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
            {selectedCapacities.map((_, index) => (
                <FormControl fullWidth margin="dense" key={index}>
                    <InputLabel id={`capacity-label-${index}`}>Capacité {index + 1}</InputLabel>
                    <Select
                        labelId={`capacity-label-${index}`}
                        value={selectedCapacities[index]?.capacity || ''}
                        onChange={(e) => handleCapacityChange(index, e.target.value)}
                    >
                        {capacities.map((capacity) => (
                            <MenuItem key={capacity.id} value={capacity.name}>
                                {capacity.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            ))}
        </Box>
    );
};

export default PathForm;
