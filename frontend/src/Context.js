import { createContext, useState } from 'react';
import axios from 'axios';

const BASE_API_URI = 'http://localhost:5000/api';

const Context = createContext({});

const ContextProvider = ({ children }) => {
  const [senderEmail, setSenderEmail] = useState('');
  const [receiverEmail, setReceiverEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [emails, setEmails] = useState([]);

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleEmailScheduler = async () => {
    setMessage('');

    if (!senderEmail || !receiverEmail || !subject || !body || !date || !time) {
      setMessage('All fields are required');
      return;
    }
    if (!validateEmail(senderEmail) || !validateEmail(receiverEmail)) {
      setMessage('Please enter valid email addresses');
      return;
    }

    // Construct Date object and convert to UTC
    const localTime = new Date(`${date}T${time}`);

    setLoading(true);
    try {
      await axios.post(`${BASE_API_URI}/email-scheduler/`, {
        senderEmail,
        receiverEmail,
        subject,
        body,
        time: localTime, // Send time in UTC
      });
      setMessage('Email scheduled successfully');
      setSenderEmail('');
      setReceiverEmail('');
      setSubject('');
      setBody('');
      setDate('');
      setTime('');
      setMessage('');
      fetchScheduledEmails();
    } catch (err) {
      console.error(err);
      setMessage('Failed to schedule email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fetchScheduledEmails = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BASE_API_URI}/email-scheduler/`);
      setEmails(response.data);
    } catch (err) {
      console.error(err);
      setMessage('Failed to schedule email. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <Context.Provider
      value={{
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
        setLoading,
        message,
        setMessage,
        emails,
        setEmails,
        handleEmailScheduler,
        fetchScheduledEmails,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export { Context, ContextProvider };
