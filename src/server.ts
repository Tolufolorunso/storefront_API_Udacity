import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cors from 'cors';
import fileUpload from 'express-fileupload';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// import asyncErrors from 'express-async-errors';
require('express-async-errors');

import errorHandlerMiddleware from './middleware/error-handler';
import notFoundHandler from './middleware/notFound';
import path from 'path';
dotenv.config();

const app: express.Application = express();

if (process.env.NODE_ENV === 'dev') {
  app.use(morgan('dev'));
}
// eslint-disable-next-line @typescript-eslint/no-inferrable-types

app.use(fileUpload());
app.use(bodyParser.json());
app.use(cors());

app.use(express.static(path.join(__dirname, 'src', 'uploads')));
app.use('/api/uploads', express.static('uploads'));

app.use('/api', routes);

app.use(notFoundHandler);
app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 3000;
const address = `0.0.0.0:${PORT}`;

app.listen(PORT, function () {
  console.log(`starting app on: ${address}`);
});

export default app;
