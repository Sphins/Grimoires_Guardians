import React, { useState, useEffect } from 'react';
import { Box, TextField } from '@mui/material';

const NoteForm = ({ file, onSave }) => {
    const [name, setName] = useState(file.name || '');
    const [content, setContent] = useState(file.data?.content || '');

    useEffect(() => {
        setName(file.name || '');
        setContent(file.data?.content || '');
    }, [file]);

    useEffect(() => {
        onSave({ ...file, name, data: { ...file.data, content } });
    }, [name, content, file, onSave]);

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
                label="Contenu"
                fullWidth
                multiline
                rows={4}
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
        </Box>
    );
};

export default NoteForm;
