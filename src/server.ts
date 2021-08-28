import mongoose from 'mongoose';
import 'dotenv/config';
import { app } from './app';

mongoose.connect(String(process.env.DATABASE_URL), {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const connection = mongoose.connection;
connection.on('error', console.error.bind(console, '⚠ Connection error.'));
connection.once('open', () => {
  console.log('🍃 Connected to MongoDB.');
});

app.listen(process.env.PORT || 3333, () => {
  console.log('🔥 Server is now running.');
});