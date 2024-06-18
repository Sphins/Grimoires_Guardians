import React, { useEffect, useContext, useState, useRef } from 'react';
import { Box, TextField, Button, Typography, Paper, List } from '@mui/material';
import io from 'socket.io-client';
import api from '../services/api';
import Message from './Message';
import { ChatContext } from './character/ChatContext';

const Chat = ({ gameId }) => {
    const { messages, messageInput, setMessageInput, handleSendMessage, addMessage } = useContext(ChatContext);
    const [userName, setUserName] = useState('System');
    const messagesEndRef = useRef(null);
    const socketRef = useRef();

    useEffect(() => {
        const apiUrl = process.env.REACT_APP_API_URL;
        socketRef.current = io(apiUrl, {
            transports: ['websocket'],
        });

        socketRef.current.on('connect', () => {
            console.log('Connected to Socket.IO server');
        });

        socketRef.current.on('chat message', (message) => {
            addMessage(message);
        });

        return () => {
            socketRef.current.disconnect();
        };
    }, [addMessage]);

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
            handleSendMessage(gameId, messageInput, userName);
            socketRef.current.emit('chat message', { user: userName, text: messageInput });
        }
    };

    const handleSendMessageClick = () => {
        handleSendMessage(gameId, messageInput, userName);
        socketRef.current.emit('chat message', { user: userName, text: messageInput });
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
                            text={message.text}
                            details={message.isDiceRoll ? `(${message.command}: ${message.rolls.join(', ')})` : undefined}
                            traitType={message.traitType}
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
                    onClick={handleSendMessageClick}
                >
                    Envoyer
                </Button>
            </Box>
        </Box>
    );
};

export default Chat;
