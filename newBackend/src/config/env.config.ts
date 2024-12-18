// This file is responsible for loading the the environment variable (.env) globally.

import { ConfigModule } from '@nestjs/config';

export const envConfig = ConfigModule.forRoot({
  isGlobal: true, // Makes configuration available throughout the app
  envFilePath: '.env', // Path to your .env file
});