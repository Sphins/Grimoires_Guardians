import React, { useState, useEffect } from 'react';
import { Box, TextField } from '@mui/material';

const CharacterForm = ({ file, onSave }) => {
    const [name, setName] = useState(file.name || '');
    const [description, setDescription] = useState(file.data?.description || '');
    const [background, setBackground] = useState(file.data?.background || '');

    useEffect(() => {
        setName(file.name || '');
        setDescription(file.data?.description || '');
        setBackground(file.data?.background || '');
    }, [file]);

    useEffect(() => {
        onSave({ ...file, name, data: { ...file.data, description, background } });
    }, [name, description, background, file, onSave]);

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
                label="Background"
                fullWidth
                multiline
                rows={4}
                value={background}
                onChange={(e) => setBackground(e.target.value)}
            />
        </Box>
    );
};

export default CharacterForm;
