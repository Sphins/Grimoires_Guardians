import React, { useEffect, useContext, useState, useRef } from 'react';
import { Box, TextField, Button, Typography, Paper, List } from '@mui/material';
import api from '../services/api';
import Message from './Message';
import { ChatContext } from './character/ChatContext';

const Chat = ({ gameId }) => {
    const { messages, messageInput, setMessageInput, handleSendMessage, addMessage } = useContext(ChatContext);
    const [userName, setUserName] = useState('System');
    const messagesEndRef = useRef(null);

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
                if (response.data && response.data.data) {
                    response.data.data.forEach(msg => {
                        if (!messages.some(message => message.text === msg.text && message.user === msg.user)) {
                            addMessage(msg);
                        }
                    });
                }
            } catch (error) {
                console.error('Error fetching chat history', error);
            }
        };

        fetchUserName();
        fetchChatHistory();
    }, [gameId, messages, addMessage]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const handleInputChange = (event) => {
        setMessageInput(event.target.value);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleSendMessage(messageInput, userName);
        }
    };

    const getResultColor = (total, rolls, sides) => {
        if (!rolls || !Array.isArray(rolls)) {
            return 'inherit';
        }
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
                                    <Typography variant="h4" component="span" style={{ color: getResultColor(message.total, message.rolls, message.command ? parseInt(message.command.split('d')[1]) : 20) }}>
                                        {message.text}
                                    </Typography>
                                ) : (
                                    message.text
                                )
                            }
                            details={message.isDiceRoll && message.rolls ? `(${message.command}: ${message.rolls.join(', ')})` : undefined}
                            traitType={message.traitType} // Passez le type de trait ici
                        />
                    ))}
                    <div ref={messagesEndRef} />
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
                    onClick={() => handleSendMessage(messageInput, userName)}
                >
                    Envoyer
                </Button>
            </Box>
        </Box>
    );
};

export default Chat;
