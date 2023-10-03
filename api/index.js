import express from 'express';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    // originsオプションを設定してCORSを有効にする
    cors: {
        origin: ['http://localhost:5175', 'http://localhost:5176'],
        methods: ['GET', 'POST'], // 許可するHTTPメソッドを指定
    },
});

const PORT = 3002;

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
