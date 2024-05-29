import React, { useState, useEffect } from 'react';
import { Box, TextField } from '@mui/material';

const ArmorForm = ({ file, onSave }) => {
    const [name, setName] = useState(file.name || '');
    const [description, setDescription] = useState(file.data?.description || '');
    const [defense, setDefense] = useState(file.data?.defense || '');

    useEffect(() => {
        setName(file.name || '');
        setDescription(file.data?.description || '');
        setDefense(file.data?.defense || '');
    }, [file]);

    useEffect(() => {
        onSave({ ...file, name, data: { ...file.data, description, defense } });
    }, [name, description, defense, file, onSave]);

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
                label="Défense"
                fullWidth
                value={defense}
                onChange={(e) => setDefense(e.target.value)}
            />
        </Box>
    );
};

export default ArmorForm;
