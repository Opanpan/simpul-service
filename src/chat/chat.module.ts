import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ChatService } from './chat.service';
import { ConversationController } from './conversation.controller';

import { Conversation } from './entities/conversation.entity';
import { Message } from './entities/message.entity';
import { ConversationRead } from './entities/conversation-read.entity';
import { MessageController } from './message.controller';
import { User } from './entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Conversation, Message, ConversationRead, User]),
  ],
  providers: [ChatService],
  controllers: [ConversationController, MessageController],
})
export class ChatModule {}
