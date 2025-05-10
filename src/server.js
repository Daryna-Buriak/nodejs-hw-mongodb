import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pino from 'pino-http';

import { getEnvVar } from './utils/getEnvVar.js';
import { getAllContactsController } from './controllers/allcontacts.controller.js';
import { getContactController } from './controllers/contact.controller.js';

dotenv.config();
const PORT = Number(getEnvVar('PORT', '3000'));

export const setupServer = async () => {
  const app = express();

  app.use(express.json());
  app.use(cors());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.get('/', (req, res) => {
    res.json({
      message: 'Hello World!',
    });
  });

  app.get('/contacts', getAllContactsController);

  app.get('/contacts/:contactId', getContactController);

  app.use((req, res, next) => {
    res.status(404).json({
      message: 'Route not found',
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
