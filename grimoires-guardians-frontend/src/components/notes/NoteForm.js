import React, { useState, useEffect } from 'react';
import { Box, TextField } from '@mui/material';

const NoteForm = ({ file, onSave }) => {
    const [localFile, setLocalFile] = useState({ ...file });

    useEffect(() => {
        setLocalFile({ ...file });
    }, [file]);

    const handleChange = (key, value) => {
        const updatedFile = { ...localFile, data: { ...localFile.data, [key]: value } };
        setLocalFile(updatedFile);
        onSave(updatedFile);
    };

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
                label="Contenu"
                fullWidth
                multiline
                rows={4}
                value={localFile.data?.content || ''}
                onChange={(e) => handleChange('content', e.target.value)}
            />
        </Box>
    );
};

export default NoteForm;
