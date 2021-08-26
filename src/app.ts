import express from 'express';
import cors from 'cors';

import { basicRouter, userRouter } from './routes';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/', basicRouter);
app.use('/users', userRouter);

export { app }