import "./style.scss";

window.onload = () => {
  const shareScreenButton = document.getElementById(
    "share-screen-button"
  ) as HTMLButtonElement;
  const stopshareButton = document.getElementById(
    "stop-share-button"
  ) as HTMLButtonElement;
  const controlsDiv = document.querySelector(".controls");
  const connectCamera = document.getElementById(
    "connect-camera-button"
  ) as HTMLButtonElement;
  const userVideoDisplay = document.getElementById(
    "user-video-display"
  ) as HTMLVideoElement;
  const guestVideoDisplay = document.getElementById(
    "guest-video-display"
  ) as HTMLVideoElement;
  const myPeerIdDisplay = document.getElementById("my-peer-id");

  let activestream: MediaStream;

  connectCamera.addEventListener("click", async () => {
    const userMediaSession = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    setUserStream(userMediaSession);
  });

  shareScreenButton.addEventListener("click", async () => {
    const userMediaSession = await navigator.mediaDevices.getDisplayMedia({
      audio: true,
      video: true,
    });
	setUserStream(userMediaSession);
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
