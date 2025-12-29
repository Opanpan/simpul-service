import * as dotenv from 'dotenv';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Task } from './tasks/task.entity';
import { TasksModule } from './tasks/tasks.module';
import { ChatModule } from './chat/chat.module';
import { ConversationRead } from './chat/entities/conversation-read.entity';
import { Conversation } from './chat/entities/conversation.entity';
import { Message } from './chat/entities/message.entity';
import { User } from './chat/entities/user.entity';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'postgres',
      port: Number(process.env.DB_PORT) || 5432,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,

      entities: [Task, ConversationRead, Conversation, Message, User],
      synchronize: false,
    }),
    TasksModule,
    ChatModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
