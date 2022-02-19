import "./style.scss";

window.onload = () => {
  const shareScreenButton = document.getElementById(
    "share-screen-button"
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

  connectCamera.addEventListener("click", async () => {
    const userMediaSession = await navigator.mediaDevices.getUserMedia({audio: true, video: true});
	userVideoDisplay.srcObject = userMediaSession;
  });

  shareScreenButton.addEventListener("click", async () => {
    alert("ShareScreen");
  });
};
