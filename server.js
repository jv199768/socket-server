const WebSocket = require('ws');

// Create a web socket server on port 8080
const server = new WebSocket.Server({ port: 8080 });

console.log('Websocket server started on ws://localhost:8080 ');

server.on('connection', (socket) => {
    console.log('Client Connected');

    // Handle Incoming messages
    socket.on('message', (message) => {
        console.log(`Received: ${message}`);
        // Echo the message back to the client
        socket.send(`Server received: ${message}`);
    });

    // Handle disconnections
    socket.on('close', () => {
        console.log('Client disconnected');
    })

    // Send a welcome message when a client connects
    socket.send('Welcome to the WebSocket server')
})