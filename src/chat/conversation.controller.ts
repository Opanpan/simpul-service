import {
  Controller,
  Get,
  Post,
  Param,
  ParseIntPipe,
  Body,
} from '@nestjs/common';
import { ChatService } from './chat.service';
import { StartConversationDTO } from './dto/start-conversation.dto';

@Controller('conversations')
export class ConversationController {
  constructor(private readonly chatService: ChatService) {}

  @Get('inbox/:userId')
  getInbox(@Param('userId', ParseIntPipe) userId: number) {
    return this.chatService.getInbox(userId);
  }

  @Get(':id/messages')
  getMessages(@Param('id', ParseIntPipe) id: number) {
    return this.chatService.getMessages(id);
  }

  @Post('start')
  startConversation(@Body() body: StartConversationDTO) {
    return this.chatService.startConversation(
      body.subject,
      body.senderId,
      body.receiverId,
      body.content,
    );
  }

  @Post(':id/read')
  markAsRead(
    @Param('id', ParseIntPipe) conversationId: number,
    @Body('userId') userId: number,
  ) {
    return this.chatService.markRead(conversationId, userId);
  }
}
