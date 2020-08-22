module.exports = function(io){
    
    io.on('connection', (socket) => {
        
        socket.on('join-room', (roomId, userId) => {
            socket.join(roomId)
            socket.to(roomId).broadcast.emit('user-connected', userId)
            console.log(roomId, userId);
        
        })
    
        socket.on('disconnet', () => {
            socket.to(roomId).broadcast.emit('user-disconnected', userId)
        })

    });
}