import React, { useState, useEffect, useCallback } from 'react';
import { Box, TextField } from '@mui/material';

const AccesoireForm = ({ file, onSave }) => {
    const [localFile, setLocalFile] = useState({ ...file });

    useEffect(() => {
        setLocalFile({ ...file });
    }, [file]);

    const handleChange = useCallback((key, value) => {
        setLocalFile(prevFile => {
            const updatedFile = { ...prevFile, [key]: value, data: { ...prevFile.data, [key]: value } };
            onSave(updatedFile);
            return updatedFile;
        });
    }, [onSave]);

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
        </Box>
    );
};

export default AccesoireForm;
