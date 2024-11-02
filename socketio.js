const { createServer } = require("http");
const { Server } = require("socket.io");

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "*"
  }
});

io.on("connection", (client) => {
  console.log("connected", client)
  //     // Success!  Now listen to messages to be received
    client.on('message',function(event){ 
        console.log('Received message from client!',event);
        
    });

    client.on('disconnect',function(){
        console.log('Server has disconnected');
    });

    client.on('customEvent',function(msg){
      console.log('msg received', msg);
      io.emit("responseEvent", "slfjlsjflsf bew syer");
  });
});

httpServer.listen(3000, () => {
    console.log(`Server is running on http://localhost:3000`);
  });
// server.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });

// var http = require('http');
// var io = require('socket.io');
// var port = 8080;

// // Start the server at port 8080
// var server = http.createServer(function(req, res){ 
//     // Send HTML headers and message
//     res.writeHead(200,{ 'Content-Type': 'text/html' }); 
//     res.end('<h1>Hello Socket Lover!</h1>');
// });

// server.listen(port);

// // Create a Socket.IO instance, passing it our server
// var socket = io.listen(server);

// // Add a connect listener
// socket.on('connection', function(client){ 
//     console.log('Connection to client established');

//     // Success!  Now listen to messages to be received
//     client.on('message',function(event){ 
//         console.log('Received message from client!',event);
//     });

//     client.on('disconnect',function(){
//         clearInterval(interval);
//         console.log('Server has disconnected');
//     });
// });

// console.log('Server running at http://127.0.0.1:' + port + '/');


// const express = require('express');
// const http = require('http');
// const socketIo = require('socket.io');

// // Initialize Express app
// const app = express();
// const server = http.createServer(app);
// const io = socketIo(server);
// var cors = require('cors');

// // Serve static files from the public directory
// app.use(express.static('public'));
// app.use(cors())

// // Handle socket connection
// io.on('connection', (socket) => {
//   console.log('A client connected');

//   // Listen for a custom event from the client
//   socket.on('customEvent', (data) => {
//     console.log('Received customEvent:', data);

//     // Emit an event to the client
//     socket.emit('responseEvent', { message: 'Hello from server' });
//   });

//   // Handle client disconnection
//   socket.on('disconnect', () => {
//     console.log('A client disconnected');
//   });
// });

// // Start the server
// const PORT = 3000;
// server.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });