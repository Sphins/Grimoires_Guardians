import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import WeaponForm from './Items/WeaponForm';
import ArmorForm from './Items/ArmorForm';
import AccesoireForm from './Items/AccesoireForm';
import OtherItemForm from './Items/OtherItemForm';
import RaceForm from './Items/RaceForm';
import ProfileForm from './Items/ProfileForm';
import PathForm from './Items/PathForm';
import CapacityForm from './Items/CapacityForm';
import NoteForm from './notes/NoteForm';
import CharacterForm from './character/CharacterForm';

const FileEditPopupItems = ({ open, file, onSave, onClose, gameId, setTabIndex }) => {
    const [localFile, setLocalFile] = useState(file);

    useEffect(() => {
        setLocalFile(file);
    }, [file]);

    const handleChange = (updatedFile) => {
        setLocalFile(updatedFile);
    };

    const handleSaveAndClose = () => {
        onSave(localFile);
        onClose();
    };

    const renderForm = () => {
        switch (file.fileType) {
            case 'Arme':
                return <WeaponForm file={localFile} onSave={handleChange} />;
            case 'Armure':
                return <ArmorForm file={localFile} onSave={handleChange} />;
            case 'Accessoire':
                return <AccesoireForm file={localFile} onSave={handleChange} />;
            case 'Autre':
                return <OtherItemForm file={localFile} onSave={handleChange} />;
            case 'Peuple':
                return <RaceForm file={localFile} onSave={handleChange} />;
            case 'Profil':
                return <ProfileForm file={localFile} onSave={handleChange} gameId={gameId} />;
            case 'Voie':
                return <PathForm file={localFile} onSave={handleChange} gameId={gameId} />;
            case 'Capacité':
                return <CapacityForm file={localFile} onSave={handleChange} />;
            case 'Privé':
            case 'Public':
                return <NoteForm file={localFile} onSave={handleChange} />;
            case 'Héro':
            case 'Créature':
                return <CharacterForm file={localFile} onSave={handleChange} gameId={gameId} onClose={onClose} setTabIndex={setTabIndex} />;
            default:
                return null;
        }
    };

    return (
        <Dialog open={open} onClose={handleSaveAndClose} maxWidth={false} fullWidth
            sx={{
                '& .MuiDialog-paper': {
                    width: '80vw',
                    maxWidth: '80vw'
                }
            }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" style={{ flexGrow: 1 }}>
                        Éditer le fichier
                    </Typography>
                    <IconButton edge="end" color="inherit" onClick={handleSaveAndClose} aria-label="close">
                        <CloseIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <DialogContent style={{ minWidth: '300px', maxWidth: '80%', overflowX: 'auto' }}>
                {renderForm()}
            </DialogContent>
        </Dialog>
    );
};

export default FileEditPopupItems;
