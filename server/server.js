const io = require('socket.io')(3001,{
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST']
    }
})

io.on('connection', socket => {
    socket.on('send-changes', delta => {
        // broad cast a message to everyone except us that changes have been made
       socket.broadcast.emit('recieve-changes', delta)
    })
    
})
