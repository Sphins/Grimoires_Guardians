import React from 'react';
import { ListItem, ListItemText, Typography, Box, Paper } from '@mui/material';

const Message = ({ user, text, details }) => {
    const isDiceRoll = details !== undefined;

    return (
        <ListItem>
            <ListItemText
                primary={
                    <Box>
                        {isDiceRoll ? (
                            <Paper variant="outlined" style={{ padding: '8px', marginTop: '8px', textAlign: 'center' }}>
                                <Typography variant="h6" component="div" style={{ textAlign: 'left' }}>
                                    {user}
                                </Typography>
                                <Typography variant="h4" component="div" style={{ fontWeight: 'bold' }}>
                                    {text}
                                </Typography>
                                <Typography variant="body2" component="div" style={{ color: 'gray' }}>
                                    {details}
                                </Typography>
                            </Paper>
                        ) : (
                            <Paper variant="outlined" style={{ padding: '8px', marginTop: '8px', textAlign: 'center' }}>
                                <Typography variant="h6" component="div" style={{ textAlign: 'left' }}>
                                    {user}
                                </Typography>
                                <Typography variant="body1" component="div" style={{ marginTop: '8px', textAlign: 'left' }}>
                                    {text}
                                </Typography>
                            </Paper>
                        )}
                    </Box>
                }
            />
        </ListItem>
    );
};

export default Message;
