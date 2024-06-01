import React, { useState, useEffect } from 'react';
import { Box, TextField } from '@mui/material';

const WeaponForm = ({ file, onSave }) => {
    const [name, setName] = useState(file.name || '');
    const [description, setDescription] = useState(file.data?.description || '');
    const [damage, setDamage] = useState(file.data?.damage || '');

    useEffect(() => {
        setName(file.name || '');
        setDescription(file.data?.description || '');
        setDamage(file.data?.damage || '');
    }, [file]);

    useEffect(() => {
        onSave({ ...file, name, data: { ...file.data, description, damage } });
    }, [name, description, damage, file, onSave]);

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
            <TextField
                margin="dense"
                label="Dégâts"
                fullWidth
                value={damage}
                onChange={(e) => setDamage(e.target.value)}
            />
        </Box>
    );
};

export default WeaponForm;
