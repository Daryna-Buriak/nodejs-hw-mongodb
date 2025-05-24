import { setupServer } from './server.js';
import { initMongoConnection } from './db/initMongoConnection.js';

const bootstrap = async () => {
  try {
    await initMongoConnection();
    setupServer();
  } catch (error) {
    console.log(error);
  }
};

export const SORT_ORDER = {
  ASC: 'asc',
  DESC: 'desc',
};

bootstrap();
