const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Servindo arquivos estáticos (HTMLs)
app.use(express.static(__dirname));

// Roteamento de eventos via Socket.IO
io.on('connection', socket => {
  socket.on('video-frame', data => {
    socket.broadcast.emit('video-frame', data);
  });

  socket.on('mobile-frame', data => {
    socket.broadcast.emit('mobile-frame', data);
  });
});

// ✅ Render define a porta automaticamente
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
