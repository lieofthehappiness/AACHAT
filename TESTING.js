const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const http = require('http');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('Client connected');
  
  // 在此處發送指令給客戶端
  socket.emit('command', 'console.log("success")');
});

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});
