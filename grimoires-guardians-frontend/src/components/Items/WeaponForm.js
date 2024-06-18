import React, { useState, useEffect, useCallback } from 'react';
import { Box, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const WeaponForm = ({ file, onSave }) => {
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
            <TextField
                margin="dense"
                label="Dégâts"
                fullWidth
                value={localFile.data?.damage || ''}
                onChange={(e) => handleChange('damage', e.target.value)}
            />
            <FormControl fullWidth margin="dense">
                <InputLabel id="weapon-type-label">Type d'Arme</InputLabel>
                <Select
                    labelId="weapon-type-label"
                    value={localFile.data?.weaponType || 'cac'}
                    onChange={(e) => handleChange('weaponType', e.target.value)}
                >
                    <MenuItem value="cac">Corps à Corps</MenuItem>
                    <MenuItem value="dist">Distance</MenuItem>
                    <MenuItem value="magic">Magique</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
};

export default WeaponForm;
