require('dotenv').config();

const http=require('http');

const express=require('express');



const {Server}=require('socket.io');

const path=require('path');

const app=express();

const server=http.createServer(app);

const io=new Server(server);

app.use(express.static(path.resolve('./public')));

const PORT=process.env.PORT||9000;

//socket io
//io=>server
//socket=>client
io.on('connection',(socket)=>{
    socket.on('user-message',message=>{
        io.emit('message',message);
    })
});

app.get('/',(req,res)=>{
    return res.sendFile('/public/index.html');
})

server.listen(PORT,()=>{
    console.log("server started from port",PORT);
});



