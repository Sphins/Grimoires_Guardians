import React, { useState, useEffect, useCallback } from 'react';
import { Box, TextField, Grid } from '@mui/material';
import api from '../../services/api';

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
    const [image, setImage] = useState(file.data?.image || '');
    const [fileType] = useState('items');
    const IMAGE_BASE_URL = process.env.REACT_APP_IMAGE_BASE_URL;

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
        fetchRaceImage();
    }, [file]);

    const fetchRaceImage = async () => {
        try {
            const response = await api.get(`/api/items/${file.id}/image`);
            if (response.data.url) {
                setImage(IMAGE_BASE_URL + response.data.url);
            } else {
                setImage(IMAGE_BASE_URL + '/items/default.webp'); // Set a default image if there's no specific image for the item
            }
        } catch (error) {
            console.error('Failed to fetch item image', error);
            setImage(IMAGE_BASE_URL + '/items/default.webp'); // Set a default image if there's an error
        }
    };

    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('image', file);
            formData.append('type', fileType);
            formData.append('id', localFile.id);
            try {
                const response = await api.post(`/api/upload`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                setImage(IMAGE_BASE_URL + response.data.url);
                handleTopLevelChange('image', response.data.url);
            } catch (error) {
                console.error('Failed to upload image', error);
            }
        }
    };

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
        <Grid container spacing={3}>
            <Grid item xs={4}>
                <div className="flex-1">
                    <label htmlFor="image-upload" className="w-full h-80 border border-red-600 rounded space-y-2 mb-4 cursor-pointer relative flex items-center justify-center">
                        <div
                            style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover', backgroundPosition: 'center', width: '100%', height: '20rem' }}
                            className={`w-full h-full ${image ? 'bg-center bg-cover' : ''}`}
                        ></div>
                        <input
                            id="image-upload"
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            style={{ display: 'none' }}
                        />
                        {!image && (
                            <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                                Cliquez pour télécharger une image
                            </div>
                        )}
                    </label>
                </div>
            </Grid>
            <Grid item xs={8}>
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
            </Grid>
        </Grid>
    );
};

export default RaceForm;
