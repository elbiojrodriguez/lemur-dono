// server.js
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Servir arquivos estáticos da raiz do projeto
app.use(express.static(__dirname));

// Escutar e repassar quadros de vídeo
io.on('connection', socket => {
  socket.on('video-frame', data => {
    socket.broadcast.emit('video-frame', data);
  });
});

// ✅ Render exige escutar na porta dinâmica fornecida
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
