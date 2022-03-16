const socket = io('/');

const videoGrid = document.getElementById("video-grid");
const myVideo = document.createElement("video");
myVideo.muted = true;

const peer = new Peer(undefined, {
    path: '/peerjs',
    host: '/',
    port: '443'
});

let myVideoStream;

navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
}).then(stream => {
    myVideoStream = stream;
    addVideoStream(myVideo, stream);

    // Answer call
    peer.on("call", call => {
        call.answer(stream);
        const video = document.createElement('video');
        call.on("stream", userVideoStream => {
            addVideoStream(video, userVideoStream);
        });
    })

    socket.on("user-connected", (userId) => {
        connectToNewUser(userId, stream);
    });
});

peer.on('open', id => {
    socket.emit("join-room", ROOM_ID, id);
});

const connectToNewUser = (userId, stream) => {
    console.log('A new stream: ',stream);
    const call = peer.call(userId, stream);
    const video = document.createElement('video');
    call.on('stream', userVideoStream => {
        console.log('Adding User video');
        addVideoStream(video, userVideoStream);
    })
};


const addVideoStream = (video, stream) => {
    video.srcObject = stream;
    video.addEventListener('loadedmetadata', () => {
        console.log('Playing video');
        video.play();
    });

    videoGrid.append(video);
    console.log(videoGrid);
};

let text = $('input');

$('html').keydown((e) => {
    if(e.which == 13 && text.val().length !== 0) {
        socket.emit('message', text.val());
        text.val('')
    }
});

socket.on('createMessage', message => {
    $('ul').append(`<li class="message"><b>User: </b>${message}</li>`);
    scrollToBottom();
});

const scrollToBottom = () => {
    let d = $(".main__chat_window");
    d.scrollTop(d.prop("scrollHeight"));
};

const muteUnmute = () => {
    const enabled = myVideoStream.getAudioTracks()[0].enabled;

    if(enabled) {
        myVideoStream.getAudioTracks()[0].enabled = false;
        setUnmuteButton();
    }
    else {
        setMuteButton();
        myVideoStream.getAudioTracks()[0].enabled = true;
    }
};

const setUnmuteButton = () => {
    const html = `
    <i class="unmute fa fa-microphone-slash"></i>
    <span>Unmute</span>
    `;

    document.querySelector(".main__mute_button").innerHTML = html;
};

const setMuteButton = () => {
    const html = `
    <i class="unmute fa fa-microphone"></i>
    <span>Mute</span>
    `;

    document.querySelector(".main__mute_button").innerHTML = html;
};

const playStop = ()=> {
    let enabled = myVideoStream.getVideoTracks()[0].enabled;

    if(enabled) {
        myVideoStream.getVideoTracks()[0].enabled = false;
        setPlayVideo();
    }
    else {
        setStopVideo();
        myVideoStream.getVideoTracks()[0].enabled = true;
    }
};

const setPlayVideo = () => {
    const html = `
    <span class="fa-stack fa-lg">
        <i class="fa fa-video-camera fa-stack-1x"></i>
        <i style="font-size:2em;" class="fa fa-ban fa-stack-2x"></i>
    </span>
    <span>Start Video</span>
    `;

    document.querySelector(".main__video_button").innerHTML = html;
};

const setStopVideo = () => {
    const html = `
    <i class="fa fa-video-camera"></i>
    <span>Stop Video</span>
    `;

    document.querySelector(".main__video_button").innerHTML = html;
};