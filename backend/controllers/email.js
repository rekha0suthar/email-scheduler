import Email from '../models/email.js';
import { sendEmail } from '../utils/index.js';
import schedule from 'node-schedule';

const emailScheduler = async (req, res) => {
  const { senderEmail, receiverEmail, subject, body, time } = req.body;

  // Validate input
  if (!senderEmail || !receiverEmail || !subject || !body || !time) {
    return res.status(400).json({ msg: 'All fields are required' });
  }

  const scheduleTime = new Date(time);

  try {
    const newEmail = new Email({
      senderEmail,
      receiverEmail,
      subject,
      body,
      status: 'pending',
      time: scheduleTime,
    });
    await newEmail.save();

    // Schedule the email
    schedule.scheduleJob(scheduleTime, async () => {
      try {
        await sendEmail(receiverEmail, subject, body);
        // Update status to 'sent'
        await Email.findByIdAndUpdate(newEmail._id, { status: 'sent' });
      } catch (err) {
        console.error('Email sending failed:', err);
        // Update status to 'failed'
        await Email.findByIdAndUpdate(newEmail._id, { status: 'failed' });
      }
    });

    res
      .status(201)
      .json({ msg: 'Email scheduled successfully', emailId: newEmail._id });
  } catch (err) {
    console.error('Error scheduling email:', err);
    res.status(500).json({ msg: 'Internal server error' });
  }
};

const getEmailScheduled = async (req, res) => {
  try {
    const emails = await Email.find();
    res.status(200).json(emails);
  } catch (err) {
    console.error('Error fetching emails:', err);
    res.status(500).json({ msg: 'Internal server error' });
  }
};

export { emailScheduler, getEmailScheduled };
