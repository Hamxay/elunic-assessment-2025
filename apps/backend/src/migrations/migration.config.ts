import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { Message } from '../app/messages/entities/message.entity';

config();

const configService = new ConfigService();

export default new DataSource({
  type: 'mysql',
  host: configService.get('APP_DB_HOST'),
  port: configService.get('APP_DB_PORT'),
  username: configService.get('APP_DB_USER'),
  password: configService.get('APP_DB_PASS'),
  database: configService.get('APP_DB_NAME'),
  entities: [Message],
  migrations: ['src/migrations/*.js'],
});