import React from 'react';
import { Box, Typography } from '@mui/material';
import FileFolderManager from './FileFolderManager';

const CharacterManagement = ({ gameId }) => {
    const fileTypes = ['Héro', 'Créature'];

    return (
        <Box>
            <Typography variant="h5" gutterBottom>Gestion des Personnages</Typography>
            <FileFolderManager fileTypes={fileTypes} gameId={gameId} structureType="character" />
        </Box>
    );
};

export default CharacterManagement;
