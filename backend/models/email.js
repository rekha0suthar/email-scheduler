import { Schema, model } from 'mongoose';

const emailSchema = new Schema({
  senderEmail: {
    type: String,
    required: true,
  },
  receiverEmail: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['sent', 'pending', 'failed'],
  },
  time: {
    type: Date,
    default: Date.now,
  },
});

const Email = model('Email', emailSchema);

export default Email;
