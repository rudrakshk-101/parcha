import * as React from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

function randomID(len) {
 let result = '';
 if (result) return result;
 var chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP',
    maxPos = chars.length,
    i;
 len = len || 5;
 for (i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos));
 }
 return result;
}

export function getUrlParams(
 url = window.location.href
) {
 let urlStr = url.split('?')[1];
 return new URLSearchParams(urlStr);
}

export default function VideoCall() {
 const [roomID, setRoomID] = React.useState(getUrlParams().get('roomID') || randomID(5));

 React.useEffect(() => {
    const params = getUrlParams();
    const newRoomID = params.get('roomID') || randomID(5);
    setRoomID(newRoomID);
 }, []);

 let myMeeting = async (element) => {
    // generate Kit Token
    const appID = 278746707;
    const serverSecret = "07edf4f4fd0af3a9f686b8429bc1a573";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID, randomID(5), randomID(5));

    // Create instance object from Kit Token.
    const zp = ZegoUIKitPrebuilt.create(kitToken);
    // start the call
    zp.joinRoom({
      container: element,
      sharedLinks: [
        {
          name: 'Personal link',
          url: window.location.protocol + '//' + window.location.host + window.location.pathname + '?roomID=' + roomID,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.GroupCall, // To implement 1-on-1 calls, modify the parameter here to [ZegoUIKitPrebuilt.OneONoneCall].
      },
    });
    
 };

 const link = window.location.protocol + '//' + window.location.host + window.location.pathname + '?roomID=' + roomID;

 return (
    <div
      className="myCallContainer"
      ref={myMeeting}
      style={{ width: '100vw', height: '100vh' }}
    >
      {/* Example of using the link in a button */}
      <button onClick={() => window.location.href = link}>Join Call</button>
    </div>
 );
}
