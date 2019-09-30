const express = require('express');
const path = require('path');
const app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.static(path.join(__dirname,'public')));


const server = app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
})

const SocketIO = require ('socket.io');
const io = SocketIO(server);

io.on('connection', (socket) => {
    console.log('user connected with socket: ', socket.id)
    socket.on('message',(data) => {
        console.log(data);
        socket.emit('message',data);
    });

    socket.on('typing',(data) => {
        console.log(data);
        socket.broadcast.emit('typing', data);
    });

    
    socket.on('new-geo', coords => {
        console.log(`${
            [socket.id] ?
                [socket.id]
                : socket.id
            } Está en:\n
            lat: ${coords.lat}\n
            long: ${coords.long}
            `);
    })



})