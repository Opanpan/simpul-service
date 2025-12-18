import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './tasks/task.entity';
import { TasksModule } from './tasks/tasks.module';
import { ChatModule } from './chat/chat.module';
import { ConversationRead } from './chat/entities/conversation-read.entity';
import { Conversation } from './chat/entities/conversation.entity';
import { Message } from './chat/entities/message.entity';
import { User } from './chat/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [Task, ConversationRead, Conversation, Message, User],
      synchronize: false,
      migrations: ['dist/database/migrations/*.{js,ts}'],
      migrationsRun: true,
    }),
    TasksModule,
    ChatModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
