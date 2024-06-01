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

const FileEditPopupItems = ({ open, file, onSave, onClose, gameId }) => {
    const [localFile, setLocalFile] = useState(file);

    useEffect(() => {
        setLocalFile(file);
    }, [file]);

    const handleSave = (updatedFile) => {
        setLocalFile(updatedFile);
    };

    const handleSaveAndClose = () => {
        onSave(localFile);
        onClose();
    };

    const renderForm = () => {
        switch (file.fileType) {
            case 'Arme':
                return <WeaponForm file={localFile} onSave={handleSave} />;
            case 'Armure':
                return <ArmorForm file={localFile} onSave={handleSave} />;
            case 'Accessoire':
                return <AccesoireForm file={localFile} onSave={handleSave} />;
            case 'Autre':
                return <OtherItemForm file={localFile} onSave={handleSave} />;
            case 'Peuple':
                return <RaceForm file={localFile} onSave={handleSave} />;
            case 'Profil':
                return <ProfileForm file={localFile} onSave={handleSave} gameId={gameId} />;
            case 'Voie':
                return <PathForm file={localFile} onSave={handleSave} gameId={gameId} />;
            case 'Capacité':
                return <CapacityForm file={localFile} onSave={handleSave} />;
            case 'Privé': // Cas pour les notes privées
            case 'Public': // Cas pour les notes publiques
                return <NoteForm file={localFile} onSave={handleSave} />;
            case 'Héro': // Cas pour les héros (personnages)
            case 'Créature': // Cas pour les créatures
                return <CharacterForm file={localFile} onSave={handleSave} />;
            default:
                return null;
        }
    };

    return (
        <Dialog open={open} onClose={handleSaveAndClose} fullWidth>
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
            <DialogContent>{renderForm()}</DialogContent>
        </Dialog>
    );
};

export default FileEditPopupItems;
