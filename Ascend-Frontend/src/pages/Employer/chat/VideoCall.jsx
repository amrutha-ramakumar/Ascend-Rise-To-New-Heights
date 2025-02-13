// import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

// function randomID(len) {
//   let result = '';
//   if (result) return result;
//   var chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP',
//     maxPos = chars.length,
//     i;
//   len = len || 5;
//   for (i = 0; i < len; i++) {
//     result += chars.charAt(Math.floor(Math.random() * maxPos));
//   }
//   return result;
// }

// export function getUrlParams(
//   url = window.location.href
// ) {
//   let urlStr = url.split('?')[1];
//   return new URLSearchParams(urlStr);
// }

// export default function VideoCall() {
//       const roomID = getUrlParams().get('roomID') || randomID(5);
//       let myMeeting = async (element) => {
//      // generate Kit Token
//      const appID = 2470738; // Replace with your ZegoCloud AppID
//      const serverSecret = "328d368265372b5228646618f299eb8d"; // Replace with your ServerSecret
//       const kitToken =  ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID,  randomID(5),  randomID(5));

    
//      // Create instance object from Kit Token.
//       const zp = ZegoUIKitPrebuilt.create(kitToken);
//       // start the call
//       zp.joinRoom({
//         container: element,
//         sharedLinks: [
//           {
//             name: 'Personal link',
//             url:
//              window.location.protocol + '//' + 
//              window.location.host + window.location.pathname +
//               '?roomID=' +
//               roomID,
//           },
//         ],
//         scenario: {
//           mode: ZegoUIKitPrebuilt.GroupCall, // To implement 1-on-1 calls, modify the parameter here to [ZegoUIKitPrebuilt.OneONoneCall].
//         },
//       });

    
//   };

//   return (
//     <div
//       className="myCallContainer"
//       ref={myMeeting}
//       style={{ width: '100vw', height: '100vh' }}
//     ></div>
//   );
// }


import { useEffect, useRef } from "react"
import { useSearchParams } from "react-router-dom"
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt"

function randomID(len) {
  let result = ""
  if (result) return result
  var chars = "12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP",
    maxPos = chars.length,
    i
  len = len || 5
  for (i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos))
  }
  return result
}

export default function VideoCall() {
  const [searchParams] = useSearchParams()
  const roomID = searchParams.get("roomID")
  const role = searchParams.get("role")
  const videoCallRef = useRef(null)

  useEffect(() => {
    const myMeeting = async () => {
      const appID = 2470738
      const serverSecret = "328d368265372b5228646618f299eb8d"
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID, randomID(5), randomID(5))

      const zp = ZegoUIKitPrebuilt.create(kitToken)
      zp.joinRoom({
        container: videoCallRef.current,
        sharedLinks: [
          {
            name: "Personal link",
            url:
              window.location.protocol + "//" + window.location.host + window.location.pathname + "?roomID=" + roomID,
          },
        ],
        scenario: {
          mode: ZegoUIKitPrebuilt.GroupCall,
        },
        turnOnCameraWhenJoining: role === "employer",
        showMyCameraToggleButton: true,
        showMyMicrophoneToggleButton: true,
        showAudioVideoSettingsButton: true,
        showScreenSharingButton: role === "employer",
        showTextChat: true,
        showUserList: true,
        maxUsers: 2,
        layout: "Auto",
        showLeavingView: true,
        showRoomDetailsButton: true,
      })
    }

    myMeeting()
  }, [roomID, role])

  return <div ref={videoCallRef} className="w-screen h-screen"></div>
}

