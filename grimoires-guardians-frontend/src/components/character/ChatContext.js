import React, { createContext, useState } from 'react';
import { rollDice } from '../../utils/diceRoller';
import api from '../../services/api';

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState('');

    const addMessage = (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
    };

    const handleSendMessage = async (gameId, messageText, userName = 'System', traitType = null) => {
        if (messageText.trim() !== '') {
            let message = { user: userName, text: messageText, traitType };
            if (messageText.startsWith('/r ')) {
                const command = messageText.substring(3);
                const { rolls, total } = rollDice(command);
                message = {
                    user: userName,
                    text: `${total}`,
                    isDiceRoll: true,
                    command,
                    rolls,
                    total,
                    traitType
                };
            }
            addMessage(message);
            setMessageInput('');
            try {
                const token = localStorage.getItem('token');
                const response = await api.post(`/api/game/${gameId}/save-chat-history`, { history: [...messages, message] }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (!response.data.success) {
                    console.error('Error saving message:', response.data);
                }
            } catch (error) {
                console.error('Error sending message', error);
            }
        }
    };

    return (
        <ChatContext.Provider value={{ messages, addMessage, messageInput, setMessageInput, handleSendMessage }}>
            {children}
        </ChatContext.Provider>
    );
};

export { ChatContext, ChatProvider };
