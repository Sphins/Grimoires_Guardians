import React, { useState, useEffect, useCallback } from 'react';
import { Box, TextField, Select, MenuItem, InputLabel, FormControl, Grid, IconButton } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import api from '../../services/api';

const PathForm = ({ file, onSave, gameId }) => {
    const [localFile, setLocalFile] = useState({
        ...file,
        data: {
            ...file.data,
            capacities: file.data.capacities && file.data.capacities.length >= 4 ? file.data.capacities : new Array(4).fill({ capacity: '' }),
        }
    });
    const [image, setImage] = useState(file.data?.image || '');
    const [fileType] = useState('items');
    const IMAGE_BASE_URL = process.env.REACT_APP_IMAGE_BASE_URL;
    const [capacities, setCapacities] = useState([]);

    useEffect(() => {
        const fetchCapacities = async () => {
            try {
                const response = await api.get(`/api/game/${gameId}/items/capacities`);
                setCapacities(response.data.capacities.map(item => JSON.parse(item.data)));
            } catch (error) {
                console.error('Failed to fetch capacities', error);
            }
        };

        fetchCapacities();
    }, [gameId]);

    useEffect(() => {
        const fetchPathImage = async () => {
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

        fetchPathImage();
    }, [file.id, IMAGE_BASE_URL]);

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
                handleChange('image', response.data.url);
            } catch (error) {
                console.error('Failed to upload image', error);
            }
        }
    };

    const handleChange = useCallback((key, value) => {
        setLocalFile(prevFile => {
            const updatedFile = {
                ...prevFile,
                data: { ...prevFile.data, [key]: value }
            };
            onSave(updatedFile);
            return updatedFile;
        });
    }, [onSave]);

    const handleCapacityChange = (index, value) => {
        const updatedCapacities = localFile.data.capacities.map((cap, i) => (
            i === index ? { ...cap, capacity: value } : cap
        ));
        handleChange('capacities', updatedCapacities);
    };

    const addCapacity = () => {
        handleChange('capacities', [...localFile.data.capacities, { capacity: '' }]);
    };

    const removeCapacity = (index) => {
        const updatedCapacities = localFile.data.capacities.filter((_, i) => i !== index);
        handleChange('capacities', updatedCapacities);
    };

    useEffect(() => {
        // Notify the parent component about the changes when localFile changes
        onSave(localFile);
    }, [localFile, onSave]);

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
                        value={localFile.data.name || ''}
                        onChange={(e) => handleChange('name', e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="Description"
                        fullWidth
                        multiline
                        rows={4}
                        value={localFile.data.description || ''}
                        onChange={(e) => handleChange('description', e.target.value)}
                    />
                    {localFile.data.capacities.map((_, index) => (
                        <Grid container spacing={2} alignItems="center" key={index}>
                            <Grid item xs={10}>
                                <FormControl fullWidth margin="dense">
                                    <InputLabel id={`capacity-label-${index}`}>Capacité {index + 1}</InputLabel>
                                    <Select
                                        labelId={`capacity-label-${index}`}
                                        value={localFile.data.capacities[index]?.capacity || ''}
                                        onChange={(e) => handleCapacityChange(index, e.target.value)}
                                    >
                                        {capacities.map((capacity) => (
                                            <MenuItem key={capacity.id} value={capacity.name}>
                                                {capacity.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={2}>
                                <IconButton
                                    color="secondary"
                                    onClick={() => removeCapacity(index)}
                                    disabled={localFile.data.capacities.length <= 4}
                                >
                                    <RemoveCircleOutlineIcon />
                                </IconButton>
                            </Grid>
                        </Grid>
                    ))}
                    <IconButton color="primary" onClick={addCapacity}>
                        <AddCircleOutlineIcon />
                    </IconButton>
                </Box>
            </Grid>
        </Grid>
    );
};

export default PathForm;
