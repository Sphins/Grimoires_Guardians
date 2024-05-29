import React, { useState, useEffect } from 'react';
import { Box, TextField } from '@mui/material';

const AccesoireForm = ({ file, onSave }) => {
    const [name, setName] = useState(file.name || '');
    const [description, setDescription] = useState(file.data?.description || '');

    useEffect(() => {
        setName(file.name || '');
        setDescription(file.data?.description || '');
    }, [file]);

    useEffect(() => {
        onSave({ ...file, name, data: { ...file.data, description } });
    }, [name, description, file, onSave]);

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
        </Box>
    );
};

export default AccesoireForm;
