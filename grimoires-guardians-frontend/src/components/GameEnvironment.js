import React, { useState, useEffect, useRef } from 'react';
import { Box, Tabs, Tab, Paper, Tooltip } from '@mui/material';
import { useParams } from 'react-router-dom'; // Importer useParams pour obtenir les paramètres de l'URL
import Chat from './Chat';
import CharacterManagement from './CharacterManagement';
import Items from './Items';
import Notes from './Journal';
import GameManagement from './GameManagement';
import ChatIcon from '@mui/icons-material/Chat';
import PersonIcon from '@mui/icons-material/Person';
import ItemIcon from '@mui/icons-material/Inventory';
import NotesIcon from '@mui/icons-material/Note';
import SettingsIcon from '@mui/icons-material/Settings';

const GameEnvironment = () => {
    const { id: gameId } = useParams(); // Obtenir gameId depuis les paramètres de l'URL
    const [tabIndex, setTabIndex] = useState(0);
    const [fileType, setFileType] = useState('video'); // 'image' or 'video'
    const [muted, setMuted] = useState(true); // state to control video sound
    const videoRef = useRef(null); // Reference to the video element

    // Lien en dur vers la vidéo sur le back-end
    const filePath = 'http://localhost:3333/videos/runic_circle.m4v';

    useEffect(() => {
        const determineFileType = (path) => {
            const extension = path.split('.').pop();
            if (['mp4', 'm4v', 'webm', 'ogg'].includes(extension)) {
                return 'video';
            } else if (['jpg', 'jpeg', 'png', 'gif'].includes(extension)) {
                return 'image';
            } else {
                return 'unknown';
            }
        };

        const type = determineFileType(filePath);
        setFileType(type);

        const handleKeyDown = (event) => {
            if (event.altKey && event.key === 's') {
                setMuted((prevMuted) => !prevMuted);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [filePath]);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.muted = muted;
        }
    }, [muted]);

    const handleTabChange = (event, newIndex) => {
        setTabIndex(newIndex);
    };

    return (
        <Box className="game-environment" display="flex" height="100vh">
            <Box className="game-map" flex="1">
                {fileType === 'video' && (
                    <video ref={videoRef} width="100%" height="100%" autoPlay loop preload="auto">
                        <source src={filePath} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                )}
                {fileType === 'image' && (
                    <img src={filePath} alt="Map" className="game-map-image" style={{ width: '100%', height: '100%' }} />
                )}
                {fileType === 'unknown' && (
                    <p>Unsupported file type</p>
                )}
            </Box>
            <Box className="game-sidebar" width="20%" display="flex" flexDirection="column">
                <Paper>
                    <Tabs
                        value={tabIndex}
                        onChange={handleTabChange}
                        indicatorColor="primary"
                        textColor="primary"
                        orientation="horizontal"
                        variant="fullWidth"
                    >
                        <Tooltip title="Chat">
                            <Tab icon={<ChatIcon />} sx={{ flex: 1, minWidth: 0 }} />
                        </Tooltip>
                        <Tooltip title="Personnages">
                            <Tab icon={<PersonIcon />} sx={{ flex: 1, minWidth: 0 }} />
                        </Tooltip>
                        <Tooltip title="Objets">
                            <Tab icon={<ItemIcon />} sx={{ flex: 1, minWidth: 0 }} />
                        </Tooltip>
                        <Tooltip title="Notes">
                            <Tab icon={<NotesIcon />} sx={{ flex: 1, minWidth: 0 }} />
                        </Tooltip>
                        <Tooltip title="Gestion">
                            <Tab icon={<SettingsIcon />} sx={{ flex: 1, minWidth: 0 }} />
                        </Tooltip>
                    </Tabs>
                </Paper>
                <Box className="tab-content" flex="1" overflow="auto">
                    {tabIndex === 0 && <Chat gameId={gameId} />}
                    {tabIndex === 1 && <CharacterManagement />}
                    {tabIndex === 2 && <Items />}
                    {tabIndex === 3 && <Notes />}
                    {tabIndex === 4 && <GameManagement />}
                </Box>
            </Box>
        </Box>
    );
};

export default GameEnvironment;