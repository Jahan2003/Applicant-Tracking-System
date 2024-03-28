import React, { useState } from 'react';
import { ZoomMtg } from '@zoomus/websdk';

const allowedEmails = ['jahansai2003@gmail.com']; // List of allowed email addresses

const ZoomComponent = () => {
  const [email, setEmail] = useState('');sp
  const [meetingId, setMeetingId] = useState('YOUR_MEETING_ID');

  const handleJoinMeeting = () => {
    if (allowedEmails.includes(email)) {
      // Valid email, allow joining the meeting
      ZoomMtg.init({
        leaveUrl: 'URL_TO_REDIRECT_AFTER_MEETING_ENDS',
        isSupportAV: true,
        success: function () {
          ZoomMtg.join({
            meetingNumber: meetingId,
            userName: 'Your Name',
            apiKey: 'YOUR_ZOOM_API_KEY',
            success: function (res) {
              console.log('Join meeting success', res);
            },
            error: function (res) {
              console.log('Join meeting failed', res);
            },
          });
        },
        error: function (res) {
          console.log('Zoom SDK init failed', res);
        },
      });
    } else {
      // Invalid email, show an error or deny access
      alert('Access Denied');
    }
  };

  return (
    <div>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleJoinMeeting}>Join Meeting</button>
    </div>
  );
};

export default ZoomComponent;
