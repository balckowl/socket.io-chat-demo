import express from 'express';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ['https://socket-io-chat-demo.vercel.app'],
        methods: ['GET', 'POST'], 
    },
});

const PORT = 3000;

app.use(cors());

io.on('connection', (socket) => {

    socket.on('chat', (msg) => {
        io.emit('chat', msg);
    });

});

app.get('/', (req, res) => {
    res.send(200)
})

server.listen(PORT, () => {
    console.log('サーバーが立ち上がりました。')
})
