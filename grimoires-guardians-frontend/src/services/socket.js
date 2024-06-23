import io from 'socket.io-client';

const socket = io('http://0.0.0.0:3000', {
    withCredentials: true
});

socket.on('connect', () => {
    console.log('Connected to socket server');
});

export default socket;
