import { Schema, model, models } from 'mongoose';

const GenerationSchema = new Schema({
  userId: { type: String, required: true },
  type: { type: String, enum: ['script', 'idea', 'shorts', 'analysis'], required: true },
  input: { type: Object, required: true },
  output: { type: Object, required: true },
  viralScore: { type: Number },
  createdAt: { type: Date, default: Date.now },
});

const Generation = models.Generation || model('Generation', GenerationSchema);

export default Generation;
