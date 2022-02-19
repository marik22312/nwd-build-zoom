import Peer from 'peerjs';
import "./style.scss";

window.onload = () => {
  const shareScreenButton = document.getElementById(
    "share-screen-button"
  ) as HTMLButtonElement;
  const stopshareButton = document.getElementById(
    "stop-share-button"
  ) as HTMLButtonElement;
  const connectCamera = document.getElementById(
    "connect-camera-button"
  ) as HTMLButtonElement;
  const userVideoDisplay = document.getElementById(
    "user-video-display"
  ) as HTMLVideoElement;
  const guestVideoDisplay = document.getElementById(
    "guest-video-display"
  ) as HTMLVideoElement;
  const myPeerIdDisplay = document.getElementById("my-peer-id") as HTMLParagraphElement;
  const guestPeerIdDisplay = document.getElementById("guest-peer-id") as HTMLParagraphElement;
  const callPeerIdInput = document.getElementById("call-peer-id") as HTMLInputElement;
  const callPeerButton = document.getElementById("call-peer-button");

  let activestream: MediaStream;

  const peer = new Peer();
  let activePeer: string;

  peer.on('open', peerId => {
	myPeerIdDisplay.innerText = `my peer ID: ${peerId}`
  })

  callPeerButton?.addEventListener('click', () => {
	  const callPeerId = callPeerIdInput.value;

	  if (!callPeerId) {
		  return alert('Please enter peer id');
	  }
	  if (!activestream) {
		  return alert('Please turn on sharing device');
	  }

	peer.call(callPeerId, activestream);
  })

  peer.on('call', call => {
		  call.answer();
		  call.on('stream', (stream) => {
			  console.log('stream!l')
			  guestVideoDisplay.srcObject = stream;
		  })
		  activePeer = call.peer;
		  guestPeerIdDisplay.textContent = `Guest ID is: ${call.peer}`
		  return ;
	  
  })

  connectCamera.addEventListener("click", async () => {
    const userMediaSession = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    setUserStream(userMediaSession);

	if (activePeer) {
		peer.call(activePeer, userMediaSession);
	}
  });

  shareScreenButton.addEventListener("click", async () => {
    const userMediaSession = await navigator.mediaDevices.getDisplayMedia({
      audio: true,
      video: true,
    });
	setUserStream(userMediaSession);
	
	if (activePeer) {
		peer.call(activePeer, userMediaSession);
	}
  });

  const setUserStream = (stream: MediaStream) => {
	if (activestream) {
		activestream.getTracks().forEach(track => track.stop());
	}
	
	activestream = stream;
	userVideoDisplay.srcObject = stream;
  }

  stopshareButton.addEventListener('click', () => {
	  if (activestream) {
		  activestream.getTracks().forEach(track => track.stop())
	  }
  })
};
