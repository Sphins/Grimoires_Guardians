// GameManagement.js
import React, { useState } from 'react';
import { Box, Typography, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import InviteMemberModal from './InviteMemberModal';

const GameManagement = ({ gameId }) => {
    const [modalOpen, setModalOpen] = useState(false);

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    return (
        <Box display="flex" flexDirection="column" alignItems="center">
            <Typography variant="h5" gutterBottom>Gestion de Partie</Typography>
            <Link
                component="button"
                variant="body1"
                onClick={handleOpenModal}
                style={{ marginBottom: '20px', textDecoration: 'none', color: '#1976d2' }}
            >
                Inviter des Membres
            </Link>
            <InviteMemberModal open={modalOpen} onClose={handleCloseModal} gameId={gameId} />
            <Link
                component={RouterLink}
                to="/home"
                variant="body1"
                style={{ marginTop: '20px', textDecoration: 'none', color: '#1976d2' }}
            >
                Quitter la Partie
            </Link>
        </Box>
    );
};

export default GameManagement;
