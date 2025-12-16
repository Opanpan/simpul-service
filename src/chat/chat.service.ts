import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { Conversation } from './entities/conversation.entity';
import { Message } from './entities/message.entity';
import { ConversationRead } from './entities/conversation-read.entity';
import { User } from './entities/user.entity';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Conversation)
    private conversationRepo: Repository<Conversation>,

    @InjectRepository(Message)
    private messageRepo: Repository<Message>,

    @InjectRepository(ConversationRead)
    private readRepo: Repository<ConversationRead>,

    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async getInbox(userId: number) {
    const conversations = await this.conversationRepo
      .createQueryBuilder('c')
      .where(":userId = ANY (string_to_array(c.participantIds, ',')::int[])", {
        userId,
      })
      .orderBy('c.lastMessageAt', 'DESC')
      .getMany();

    if (!conversations.length) return [];

    const allUserIds = [
      ...new Set([
        ...conversations.flatMap((c) => c.participantIds),
        ...conversations.map((c) => c.lastMessageById).filter(Boolean),
      ]),
    ];

    const users = await this.userRepo.findBy({
      id: In(allUserIds),
    });

    const userMap = Object.fromEntries(users.map((u) => [u.id, u]));

    return conversations.map((c) => ({
      ...c,
      lastMessageUser: c.lastMessageById
        ? {
            id: c.lastMessageById,
            name: userMap[c.lastMessageById]?.name ?? null,
          }
        : null,
      participants: c.participantIds.map((id) => ({
        id,
        name: userMap[id]?.name ?? null,
      })),
    }));
  }

  async getMessages(conversationId: number) {
    const messages = await this.messageRepo.find({
      where: {
        conversationId,
        isDeleted: false,
      },
      order: { createdAt: 'ASC' },
    });

    if (!messages.length) return [];

    const senderIds = [...new Set(messages.map((m) => m.senderId))];

    const users = await this.userRepo.find({
      where: { id: In(senderIds) },
    });

    const userMap = Object.fromEntries(users.map((u) => [u.id, u.name]));

    return messages.map((msg) => ({
      ...msg,
      senderName: userMap[msg.senderId] ?? null,
    }));
  }

  async sendMessage(conversationId: number, senderId: number, content: string) {
    const message = await this.messageRepo.save({
      conversationId,
      senderId,
      content,
    });

    await this.conversationRepo.update(conversationId, {
      lastMessage: content,
      lastMessageAt: new Date(),
      lastMessageById: senderId,
    });

    return message;
  }

  async editMessage(messageId: number, content: string) {
    const msg = await this.messageRepo.findOne({
      where: { id: messageId },
    });

    if (!msg || msg.isDeleted) {
      throw new NotFoundException('Message not found');
    }

    msg.content = content;
    msg.isEdited = true;

    return this.messageRepo.save(msg);
  }

  async deleteMessage(messageId: number) {
    const msg = await this.messageRepo.findOne({
      where: { id: messageId },
    });

    if (!msg) {
      throw new NotFoundException('Message not found');
    }

    msg.isDeleted = true;
    return this.messageRepo.save(msg);
  }

  async markRead(conversationId: number, userId: number) {
    const existing = await this.readRepo.findOne({
      where: { conversationId, userId },
    });

    if (existing) {
      existing.lastReadAt = new Date();
      return this.readRepo.save(existing);
    }

    return this.readRepo.save({
      conversationId,
      userId,
      lastReadAt: new Date(),
    });
  }

  async startConversation(
    senderId: number,
    receiverId: number,
    content: string,
  ) {
    const conversations = await this.conversationRepo
      .createQueryBuilder('c')
      .where('c.participantIds LIKE :sender', {
        sender: `%${senderId}%`,
      })
      .andWhere('c.participantIds LIKE :receiver', {
        receiver: `%${receiverId}%`,
      })
      .getMany();

    const existing = conversations.find(
      (c) =>
        c.participantIds.includes(senderId) &&
        c.participantIds.includes(receiverId),
    );

    if (existing) {
      return this.sendMessage(existing.id, senderId, content);
    }

    const conversation = await this.conversationRepo.save({
      subject:
        'Jeannette Moraima Guaman Chamba (Hutto I-589) [ Hutto Follow Up - Brief Service ]',
      participantIds: [senderId, receiverId],
      lastMessage: content,
      lastMessageAt: new Date(),
      lastMessageById: senderId,
    });

    await this.messageRepo.save({
      conversationId: conversation.id,
      senderId,
      content,
    });

    return conversation;
  }
}
