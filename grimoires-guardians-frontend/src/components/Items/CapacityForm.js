import React, { useState, useEffect, useCallback } from 'react';
import { Box, TextField, Grid } from '@mui/material';

const CapacityForm = ({ file, onSave }) => {
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
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <TextField
                        margin="dense"
                        label="Bonus Dégâts"
                        type="number"
                        fullWidth
                        value={localFile.data?.bonusDegats || ''}
                        onChange={(e) => handleChange('bonusDegats', e.target.value)}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        margin="dense"
                        label="Bonus Armure"
                        type="number"
                        fullWidth
                        value={localFile.data?.bonusArmure || ''}
                        onChange={(e) => handleChange('bonusArmure', e.target.value)}
                    />
                </Grid>
            </Grid>
        </Box>
    );
};

export default CapacityForm;
