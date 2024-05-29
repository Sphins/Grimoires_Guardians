import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import WeaponForm from './popups/WeaponForm';
import ArmorForm from './popups/ArmorForm';
import AccesoireForm from './popups/AccesoireForm';
import OtherItemForm from './popups/OtherItemForm';

const FileEditPopup = ({ open, file, onSave, onClose }) => {
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

export default FileEditPopup;
