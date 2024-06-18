import React, { useState, useEffect, useCallback } from 'react';
import { Box, TextField, Grid } from '@mui/material';

const RaceForm = ({ file, onSave }) => {
    const [localFile, setLocalFile] = useState({
        ...file,
        data: {
            ...file.data,
            traits: {
                adresse: file.data?.traits?.adresse || 0,
                esprit: file.data?.traits?.esprit || 0,
                puissance: file.data?.traits?.puissance || 0,
            }
        }
    });

    useEffect(() => {
        setLocalFile({
            ...file,
            data: {
                ...file.data,
                traits: {
                    adresse: file.data?.traits?.adresse || 0,
                    esprit: file.data?.traits?.esprit || 0,
                    puissance: file.data?.traits?.puissance || 0,
                }
            }
        });
    }, [file]);

    const handleChange = useCallback((key, value) => {
        setLocalFile(prevFile => {
            const updatedFile = {
                ...prevFile,
                data: {
                    ...prevFile.data,
                    traits: {
                        ...prevFile.data.traits,
                        [key]: value,
                    }
                }
            };
            onSave(updatedFile);
            return updatedFile;
        });
    }, [onSave]);

    const handleTopLevelChange = useCallback((key, value) => {
        setLocalFile(prevFile => {
            const updatedFile = {
                ...prevFile,
                [key]: value,
                data: {
                    ...prevFile.data,
                    [key]: value,
                }
            };
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
                onChange={(e) => handleTopLevelChange('name', e.target.value)}
            />
            <TextField
                margin="dense"
                label="Description"
                fullWidth
                multiline
                rows={4}
                value={localFile.data?.description || ''}
                onChange={(e) => handleTopLevelChange('description', e.target.value)}
            />
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <TextField
                        margin="dense"
                        label="Adresse"
                        type="number"
                        fullWidth
                        value={localFile.data?.traits?.adresse || 0}
                        onChange={(e) => handleChange('adresse', parseInt(e.target.value, 10))}
                    />
                </Grid>
                <Grid item xs={4}>
                    <TextField
                        margin="dense"
                        label="Esprit"
                        type="number"
                        fullWidth
                        value={localFile.data?.traits?.esprit || 0}
                        onChange={(e) => handleChange('esprit', parseInt(e.target.value, 10))}
                    />
                </Grid>
                <Grid item xs={4}>
                    <TextField
                        margin="dense"
                        label="Puissance"
                        type="number"
                        fullWidth
                        value={localFile.data?.traits?.puissance || 0}
                        onChange={(e) => handleChange('puissance', parseInt(e.target.value, 10))}
                    />
                </Grid>
            </Grid>
        </Box>
    );
};

export default RaceForm;
