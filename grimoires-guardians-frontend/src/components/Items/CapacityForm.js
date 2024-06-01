import React, { useState, useEffect } from 'react';
import { Box, TextField, Grid } from '@mui/material';

const CapacityForm = ({ file, onSave }) => {
    const [name, setName] = useState(file.name || '');
    const [description, setDescription] = useState(file.data?.description || '');
    const [bonusDegats, setBonusDegats] = useState(file.data?.bonusDegats || '');
    const [bonusArmure, setBonusArmure] = useState(file.data?.bonusArmure || '');

    useEffect(() => {
        setName(file.name || '');
        setDescription(file.data?.description || '');
        setBonusDegats(file.data?.bonusDegats || '');
        setBonusArmure(file.data?.bonusArmure || '');
    }, [file]);

    useEffect(() => {
        onSave({
            ...file,
            name,
            data: {
                ...file.data,
                description,
                bonusDegats,
                bonusArmure
            }
        });
    }, [name, description, bonusDegats, bonusArmure, file, onSave]);

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
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <TextField
                        margin="dense"
                        label="Bonus Dégâts"
                        type="number"
                        fullWidth
                        value={bonusDegats}
                        onChange={(e) => setBonusDegats(e.target.value)}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        margin="dense"
                        label="Bonus Armure"
                        type="number"
                        fullWidth
                        value={bonusArmure}
                        onChange={(e) => setBonusArmure(e.target.value)}
                    />
                </Grid>
            </Grid>
        </Box>
    );
};

export default CapacityForm;
