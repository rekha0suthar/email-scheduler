import React, { useContext } from 'react';
import { Context } from '../Context';

const EmailScheduler = () => {
  const {
    senderEmail,
    setSenderEmail,
    receiverEmail,
    setReceiverEmail,
    subject,
    setSubject,
    body,
    setBody,
    date,
    setDate,
    time,
    setTime,
    loading,
    message,
    handleEmailScheduler,
  } = useContext(Context);
  return (
    <div className="email-schedule-form">
      <h2>Email Scheduler</h2>
      <div>
        <label htmlFor="senderEmail">From</label>
        <br />
        <input
          id="senderEmail"
          type="text"
          placeholder="Enter your email"
          value={senderEmail}
          onChange={(e) => setSenderEmail(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="receiverEmail">To</label>
        <br />
        <input
          id="receiverEmail"
          type="text"
          placeholder="Enter receiver email"
          value={receiverEmail}
          onChange={(e) => setReceiverEmail(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="subject"> Subject</label>
        <br />
        <input
          id="subject"
          type="text"
          placeholder="Enter your email subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="body">Message</label>
        <br />
        <textarea
          id="body"
          placeholder="Enter your email body"
          rows={10}
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
      </div>
      <div>
        <label htmlFor="scheduleDate">Schedule Time</label>
        <br />
        <input
          id="scheduleDate"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <input
          id="scheduleTime"
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
      </div>
      <button onClick={handleEmailScheduler} disabled={loading}>
        {loading ? 'Scheduling...' : 'Schedule Email'}
      </button>
      {message && <div className="message">{message}</div>}
    </div>
  );
};

export default EmailScheduler;
