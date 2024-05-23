import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography, Paper, List } from '@mui/material';
import { rollDice } from '../utils/diceRoller';
import api from '../services/api';
import Message from './Message';

const Chat = ({ gameId }) => {
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState('');
    const [userName, setUserName] = useState('');

    useEffect(() => {
        const fetchUserName = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await api.get('/api/user', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setUserName(response.data.username);
            } catch (error) {
                console.error('Error fetching user name', error);
            }
        };

        const fetchChatHistory = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await api.get(`/api/game/${gameId}/get-chat-history`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setMessages(response.data.data || []);
            } catch (error) {
                console.error('Error fetching chat history', error);
            }
        };

        fetchUserName();
        fetchChatHistory();
    }, [gameId]);

    const handleDiceRoll = (command) => {
        const { rolls, total } = rollDice(command);
        return { rolls, total };
    };

    const handleSendMessage = async () => {
        if (messageInput.trim() !== '') {
            let message = { user: userName, text: messageInput };
            if (messageInput.startsWith('/r ')) {
                const command = messageInput.substring(3);
                const { rolls, total } = handleDiceRoll(command);
                message = {
                    user: userName,
                    text: `${total}`,
                    isDiceRoll: true,
                    command,
                    rolls,
                    total
                };
            }
            const newMessages = [...messages, message];
            setMessages(newMessages);
            setMessageInput('');

            // Sauvegarder l'historique du chat
            try {
                const token = localStorage.getItem('token');
                await api.post(`/api/game/${gameId}/save-chat-history`, {
                    history: newMessages
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
            } catch (error) {
                console.error('Error saving chat history', error);
            }
        }
    };

    const handleInputChange = (event) => {
        setMessageInput(event.target.value);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleSendMessage();
        }
    };

    const getResultColor = (total, rolls, sides) => {
        if (sides === 20) {
            if (rolls.includes(1)) {
                return 'red';
            } else if (rolls.includes(20)) {
                return 'green';
            }
        }
        return 'inherit';
    };

    return (
        <Box display="flex" flexDirection="column" height="100%">
            <Typography variant="h5" gutterBottom>Chat</Typography>
            <Paper style={{ flex: 1, overflow: 'auto', marginBottom: '16px', padding: '8px' }}>
                <List>
                    {Array.isArray(messages) && messages.map((message, index) => (
                        <Message
                            key={index}
                            user={message.user}
                            text={
                                message.isDiceRoll ? (
                                    <Typography variant="h4" component="span" style={{ color: getResultColor(message.total, message.rolls, parseInt(message.command.split('d')[1])) }}>
                                        {message.text}
                                    </Typography>
                                ) : (
                                    message.text
                                )
                            }
                            details={message.isDiceRoll ? `(${message.command}: ${message.rolls.join(', ')})` : undefined}
                        />
                    ))}
                </List>
            </Paper>
            <Box display="flex" alignItems="center">
                <TextField
                    label="Message"
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    value={messageInput}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                />
                <Button
                    variant="contained"
                    color="primary"
                    style={{ marginLeft: '8px', marginTop: '16px', height: '56px' }}
                    onClick={handleSendMessage}
                >
                    Envoyer
                </Button>
            </Box>
        </Box>
    );
};

export default Chat;
