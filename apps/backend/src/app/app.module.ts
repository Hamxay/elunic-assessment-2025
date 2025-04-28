import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MessagesModule } from './messages/messages.module';
import { Message } from './messages/entities/message.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('APP_DB_HOST'),
        port: configService.get('APP_DB_PORT'),
        username: configService.get('APP_DB_USER'),
        password: configService.get('APP_DB_PASS'),
        database: configService.get('APP_DB_NAME'),
        entities: [Message],
        synchronize: true, // Set to false for explicit migrations
        ssl: {
          rejectUnauthorized: false,
      },
      }),
    }),
    MessagesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}