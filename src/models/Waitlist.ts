import mongoose from 'mongoose';

const WaitlistSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email',
    ],
  },
  plan: {
    type: String,
    enum: ['Pro', 'Free'],
    default: 'Pro',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Waitlist || mongoose.model('Waitlist', WaitlistSchema);
