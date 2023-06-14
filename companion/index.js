import * as messaging from "messaging";

function returnCurrentTimer(data) {
    if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
      // 4
        messaging.peerSocket.send({hour: '1', minute: '23'});
    } else {
      console.error("Error: Connection is not open");
    }
  }
  
  messaging.peerSocket.addEventListener("message", (evt) => {
    switch (evt.data?.command) {
        // 3
        case "fetchTimer": {
            returnCurrentTimer();
            break;
        }
        case "createTimer": 
        default: {
            console.log(evt.data);
            break;
        }        
    }
  });
  
  messaging.peerSocket.addEventListener("error", (err) => {
    console.error(`Connection error: ${err.code} - ${err.message}`);
  });