import React, { useState, useEffect, useCallback } from 'react';
import { Box, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import api from '../../services/api';

const NoteForm = ({ file, onSave }) => {
    const [localFile, setLocalFile] = useState({ ...file });
    const [noteType, setNoteType] = useState(file.data?.noteType || 'Note');
    const [image, setImage] = useState('');
    const [fileType] = useState('notes');
    const IMAGE_BASE_URL = process.env.REACT_APP_IMAGE_BASE_URL;

    useEffect(() => {
        setLocalFile({ ...file });
        setNoteType(file.data?.noteType || 'Note');
    }, [file]);

    useEffect(() => {
        const fetchNoteImage = async () => {
            try {
                const response = await api.get(`/api/notes/${file.id}/image`);
                if (response.data.url) {
                    setImage(IMAGE_BASE_URL + response.data.url);
                } else {
                    setImage(IMAGE_BASE_URL + '/notes/default.webp'); // Default image if no specific image is set
                }
            } catch (error) {
                console.error('Failed to fetch note image', error);
                setImage(IMAGE_BASE_URL + '/notes/default.webp'); // Default image if there's an error
            }
        };

        fetchNoteImage();
    }, [file.id, IMAGE_BASE_URL]);

    const handleImageUpload = async (event) => {
        const uploadedFile = event.target.files[0];
        if (uploadedFile) {
            const formData = new FormData();
            formData.append('image', uploadedFile);
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
            const updatedFile = { ...prevFile, [key]: value, data: { ...prevFile.data, [key]: value } };
            return updatedFile;
        });
    }, []);

    useEffect(() => {
        onSave({ ...localFile, data: { ...localFile.data, noteType } });
    }, [localFile, noteType, onSave]);

    return (
        <Box>
            <FormControl fullWidth margin="dense">
                <InputLabel id="note-type-label">Type</InputLabel>
                <Select
                    labelId="note-type-label"
                    value={noteType}
                    onChange={(e) => setNoteType(e.target.value)}
                >
                    <MenuItem value="Note">Note</MenuItem>
                    <MenuItem value="Image">Image</MenuItem>
                    <MenuItem value="Both">Les deux</MenuItem>
                </Select>
            </FormControl>

            <TextField
                autoFocus
                margin="dense"
                label="Nom"
                fullWidth
                value={localFile.name || ''}
                onChange={(e) => handleChange('name', e.target.value)}
            />

            {(noteType === 'Note' || noteType === 'Both') && (
                <TextField
                    margin="dense"
                    label="Contenu"
                    fullWidth
                    multiline
                    rows={4}
                    value={localFile.data?.content || ''}
                    onChange={(e) => handleChange('content', e.target.value)}
                />
            )}

            {(noteType === 'Image' || noteType === 'Both') && (
                <div className="flex-1">
                    <label htmlFor="image-upload" className="w-full h-80 border border-gray-400 rounded space-y-2 mb-4 cursor-pointer relative flex items-center justify-center">
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
            )}
        </Box>
    );
};

export default NoteForm;
