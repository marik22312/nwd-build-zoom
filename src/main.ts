import "./style.scss";
import Peer from "peerjs";

window.onload = () => {
  const peerIdInput = document.getElementById(
    "peer-id-input"
  ) as HTMLInputElement;
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
    alert("Connect camera");
  });

  shareScreenButton.addEventListener("click", async () => {
    alert("ShareScreen");
  });
};
