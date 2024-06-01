import React, { useState, useEffect } from 'react';
import { Box, TextField, Grid } from '@mui/material';

const RaceForm = ({ file, onSave }) => {
    const [name, setName] = useState(file.name || '');
    const [description, setDescription] = useState(file.data?.description || '');
    const [adresse, setAdresse] = useState(file.data?.traits?.adresse || 0);
    const [esprit, setEsprit] = useState(file.data?.traits?.esprit || 0);
    const [puissance, setPuissance] = useState(file.data?.traits?.puissance || 0);

    useEffect(() => {
        setName(file.name || '');
        setDescription(file.data?.description || '');
        setAdresse(file.data?.traits?.adresse || 0);
        setEsprit(file.data?.traits?.esprit || 0);
        setPuissance(file.data?.traits?.puissance || 0);
    }, [file]);

    useEffect(() => {
        onSave({
            ...file,
            name,
            data: {
                ...file.data,
                description,
                traits: { adresse, esprit, puissance }
            }
        });
    }, [name, description, adresse, esprit, puissance, file, onSave]);

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
                <Grid item xs={4}>
                    <TextField
                        margin="dense"
                        label="Adresse"
                        type="number"
                        fullWidth
                        value={adresse}
                        onChange={(e) => setAdresse(parseInt(e.target.value, 10))}
                    />
                </Grid>
                <Grid item xs={4}>
                    <TextField
                        margin="dense"
                        label="Esprit"
                        type="number"
                        fullWidth
                        value={esprit}
                        onChange={(e) => setEsprit(parseInt(e.target.value, 10))}
                    />
                </Grid>
                <Grid item xs={4}>
                    <TextField
                        margin="dense"
                        label="Puissance"
                        type="number"
                        fullWidth
                        value={puissance}
                        onChange={(e) => setPuissance(parseInt(e.target.value, 10))}
                    />
                </Grid>
            </Grid>
        </Box>
    );
};

export default RaceForm;
