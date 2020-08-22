const socket = io('/');
const videoGrid = document.getElementById('video_grid')

const myPeer = new Peer(username, {
    host: '/',
    port: 4000
})

myPeer.on('open', id => {
    var params = {
        room: RoomName,
        name: username
    }
    socket.emit('join', params, function(){
        console.log('User has joined this channel');
    });  

})


console.log("checking admin: ", admin)

// if(admin === 'true' || admin === true){
if(true){
    const myVideo = document.createElement('video')
    myVideo.muted = true;
    navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
    }).then(stream => {

         myPeer.on('call', function(call){
             console.log("into call 1");
            // call.answer(stream)

            const video = document.createElement('video')
            call.on('stream', function(userVideoStream){
                addVideoStream(video, userVideoStream)
            })
        
            call.on('close', () => {
                video.remove()  
            })
        })

       

        addVideoStream( myVideo, stream)

        socket.on('user-connected', username => {
            console.log("user connected: ", username);
            connectToNewUser(username, stream)
        }) 

    })

}
 

myPeer.on('call', function(call) {
    console.log("into call 2");
//    call.answer(stream)

   const video = document.createElement('video')
   call.on('stream', function(s){
       console.log("into stream");
       addVideoStream(video, s)
   })

   call.on('close', () => {
       video.remove()  
   })
})




function connectToNewUser(userId, stream){
    console.log("i am here")
    // myPeer.call(userId, stream)
    const call = myPeer.call(userId, stream)
    addVideoStream(video, stream)
    const video = document.createElement('video')
    // call.on('stream', userVideoStream => {
    //     addVideoStream(video, userVideoStream)
    // })

    // call.on('close', () => {
    //     video.remove()  
    // })

}


function addVideoStream(video,  stream){
    console.log("addVideoStream")
    video.srcObject = stream;
    video.addEventListener('loadedmetadata', () => {
        video.play()
    })
    videoGrid.append(video)
}