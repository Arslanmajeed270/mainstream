module.exports = function(io, Users){
    
    const users = new Users();
    
    io.on('connection', (socket) => {
        
        socket.on('join', (params, callback) => {

            socket.join(params.room);
            const username = params.name;

           socket.to(username).broadcast.emit('user-connected', username)

            users.AddUserData(socket.id, params.name, params.room);


            console.log("checking user: ",username );


            io.to(params.room).emit('usersList', users.GetUsersList(params.room));
            
            callback();
        });
        
        socket.on('createMessage', (message, callback) => {
            io.to(message.room).emit('newMessage', {
                text: message.text,
                room: message.room,
                from: message.sender,
                image: message.userPic
            });
            
            callback();
        });
        
        socket.on('disconnect', () => {
            var user = users.RemoveUser(socket.id);
            if(user){
                socket.to(user.name).broadcast.emit('user-disconnected', user.name)

                io.to(user.room).emit('usersList', users.GetUsersList(user.room));
            }
        })
    });
}