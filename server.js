// server.js
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(__dirname));

io.on('connection', socket => {
  socket.on('video-frame', data => {
    socket.broadcast.emit('video-frame', data); // envia para todos os outros
  });
});

server.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
