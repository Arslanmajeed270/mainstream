const socket = io('/');
const videoGrid = document.getElementById('video_grid');
const myPeer = new Peer(undefined, {
    host: '/',
    port: '3001'
});


const peers = {};
console.log("checking admin: ", admin);

  console.log("into if")

const myVideo = document.createElement('video');
if( admin == 'true' || admin == true){
    myVideo.muted = true;
}
  navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
}).then(stream => {
    if(admin == 'true' || admin == true){
        addVideoStream(myVideo, stream)
    }

    myPeer.on('call', call => {
        call.answer(stream)

        call.on('stream', userVideoStream => {
            addVideoStream(myVideo, userVideoStream)
        })
    })

    socket.on('user-connected', userId => {
        connectToNewUser(userId, stream)
    })

})
  

socket.on('user-disconnected', userId => {
    console.log("checking disconnected id: ", userId);
    if(peers[userId]) peers[userId].close()
})

myPeer.on('open', id => {
    socket.emit('join-room', ROOM_ID, id)

})


function connectToNewUser(userId, stream){
    const call = myPeer.call(userId, stream)
    const video = document.createElement('video')
    // call.on('stream', userVideoStream => {
    //     addVideoStream(video, stream)
    // })

    // call.on('close', () => {
    //     video.remove()
    // })

    peers[userId] = call;

}


socket.on('user-connected', userId => {
    console.log('user connected: ', userId);
})

function addVideoStream(video, stream){
    video.srcObject =  stream;
    video.addEventListener('loadedmetadata', () =>{
        video.play()
    })
    videoGrid.append(video)
}

function linkHandler(e){
    console.log("i am here");
    e.preventDefault();
    let link = document.getElementById('affiliatedUrl').value;
    console.log("checking link value: ", link);
}
