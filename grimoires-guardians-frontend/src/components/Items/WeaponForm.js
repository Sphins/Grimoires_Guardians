import React, { useState, useEffect } from 'react';
import { Box, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const WeaponForm = ({ file, onSave }) => {
    const [name, setName] = useState(file.name || '');
    const [description, setDescription] = useState(file.data?.description || '');
    const [damage, setDamage] = useState(file.data?.damage || '');
    const [weaponType, setWeaponType] = useState(file.data?.weaponType || 'cac');

    useEffect(() => {
        setName(file.name || '');
        setDescription(file.data?.description || '');
        setDamage(file.data?.damage || '');
        setWeaponType(file.data?.weaponType || 'cac');
    }, [file]);

    useEffect(() => {
        onSave({ ...file, name, data: { ...file.data, description, damage, weaponType } });
    }, [name, description, damage, weaponType, file, onSave]);

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
            <FormControl fullWidth margin="dense">
                <InputLabel id="weapon-type-label">Type d'Arme</InputLabel>
                <Select
                    labelId="weapon-type-label"
                    value={weaponType}
                    onChange={(e) => setWeaponType(e.target.value)}
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
