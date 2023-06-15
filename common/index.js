import * as messaging from "messaging";

export const sendMessage = (payload) => {
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    messaging.peerSocket.send(payload);
  } else {
    console.error("Error: Connection is not open");
  }
};