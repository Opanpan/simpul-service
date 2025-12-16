import {
  Controller,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { ChatService } from './chat.service';
import { SendMessageDTO } from './dto/send-message.dto';
import { UpdateMessageDTO } from './dto/update-message.dto';

@Controller('messages')
export class MessageController {
  constructor(private readonly chatService: ChatService) {}

  @Post(':conversationId')
  sendMessage(
    @Param('conversationId', ParseIntPipe) conversationId: number,
    @Body() dto: SendMessageDTO,
  ) {
    return this.chatService.sendMessage(
      conversationId,
      dto.senderId,
      dto.content,
    );
  }

  @Put(':id')
  editMessage(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateMessageDTO,
  ) {
    return this.chatService.editMessage(id, dto.content);
  }

  @Delete(':id')
  deleteMessage(@Param('id', ParseIntPipe) id: number) {
    return this.chatService.deleteMessage(id);
  }
}
