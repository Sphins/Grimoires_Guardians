import React from 'react';
import { Box, Typography } from '@mui/material';
import FileFolderManager from './FileFolderManager';

const ItemManagement = ({ gameId }) => {
    const fileTypes = ['Arme', 'Armure', 'Accessoire', 'Autre', 'Peuple', 'Profil', 'Voie', 'Capacité'];

    return (
        <Box>
            <Typography variant="h5" gutterBottom>Gestion des Objets</Typography>
            <FileFolderManager fileTypes={fileTypes} gameId={gameId} structureType="item" />
        </Box>
    );
};

export default ItemManagement;
