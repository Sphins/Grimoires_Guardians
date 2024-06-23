import React from 'react';
import { Box, Typography } from '@mui/material';
import FileFolderManager from './FileFolderManager'; // Assurez-vous que le chemin est correct

const NoteManagement = ({ gameId }) => {
    const fileTypes = ['Public', 'Privé'];

    return (
        <Box>
            <Typography variant="h5" gutterBottom>Gestion des Notes</Typography>
            <FileFolderManager fileTypes={fileTypes} gameId={gameId} structureType="note" />
        </Box>
    );
};

export default NoteManagement;
