import { io } from 'socket.io-client';

const socket = io('http://localhost:3001')
socket.emit('chat message', 'fff');
