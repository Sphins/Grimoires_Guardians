import React, { createContext, useState } from 'react';
import { rollDice } from '../../utils/diceRoller';  // Assurez-vous que le chemin est correct

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState('');

    const addMessage = (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
    };

    const handleSendMessage = (messageText, userName = 'System', traitType = null) => {
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
        }
    };

    return (
        <ChatContext.Provider value={{ messages, addMessage, messageInput, setMessageInput, handleSendMessage }}>
            {children}
        </ChatContext.Provider>
    );
};

export { ChatContext, ChatProvider };
