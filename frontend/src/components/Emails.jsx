import React, { useContext, useEffect } from 'react';
import { Context } from '../Context';

const Emails = () => {
  const { emails, fetchScheduledEmails } = useContext(Context);

  useEffect(() => {
    fetchScheduledEmails();
  }, []);
  return (
    <div className="emails-container">
      {emails.map((email) => (
        <div className="email-wrapper">
          <span>
            <h3>Subject: {email.subject}</h3>
            <p
              style={{
                color:
                  email.status === 'pending'
                    ? 'orange'
                    : email.status === 'sent'
                    ? 'green'
                    : 'red',
              }}
            >
              Status: {email.status}
            </p>
          </span>

          <p>From: {email.senderEmail}</p>
          <p>To: {email.receiverEmail}</p>
          <p>Message: {email.body}</p>
        </div>
      ))}
    </div>
  );
};

export default Emails;
