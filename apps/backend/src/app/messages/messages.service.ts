import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './entities/message.entity';
import { CreateMessagesDto } from './dto/create-message.dto';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private messagesRepository: Repository<Message>,
  ) {}

  async findAll(page = 1, limit = 10): Promise<{ message: string; items: number[] }[]> {
    try {
      const allMessages = await this.messagesRepository.find({
        order: { createdAt: 'ASC' },
      });
  
      if (allMessages.length === 0) {
        return [];
      }
  
      // Group messages by parentMessage
      const groupedMessages: Record<string, number[]> = {};
  
      allMessages.forEach(message => {
        const parent = message.parentMessage || '';
        if (!groupedMessages[parent]) {
          groupedMessages[parent] = [];
        }
        groupedMessages[parent].push(Number(message.content));
      });
  
      // Format the response with pagination applied to each group
      const response = Object.keys(groupedMessages).map(parent => {
        const items = groupedMessages[parent];
        const paginatedItems = items.slice((page - 1) * limit, page * limit);
        return {
          message: parent,
          items: paginatedItems,
        };
      });
  
      return response;
    } catch (error) {
      console.error('Error fetching messages:', error);
      throw new Error('Failed to fetch messages');
    }
  }
  

  async createMultiple(createMessagesDto: CreateMessagesDto): Promise<{ message: string; items: any[] }> {
    try {
      const { message, items } = createMessagesDto;

      const toSave = items.map(item =>
        this.messagesRepository.create({
          content: item.toString(),
          parentMessage: message,
        })
      );

      await this.messagesRepository.save(toSave);

      return {
        message,
        items,
      };
    } catch (error) {
      console.error('Error creating multiple messages:', error);
      throw new Error('Failed to create multiple messages');
    }
  }

  async createTestMessages(): Promise<void> {
    try {
      const testMessages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

      const toSave = testMessages.map(num =>
        this.messagesRepository.create({
          content: num.toString(),
          parentMessage: 'Test messages',
        })
      );

      await this.messagesRepository.save(toSave);
    } catch (error) {
      console.error('Error creating test messages:', error);
      throw new Error('Failed to create test messages');
    }
  }
}
