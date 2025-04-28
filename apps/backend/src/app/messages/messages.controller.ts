import { Controller, Get, Post, Body, Query, ParseIntPipe, DefaultValuePipe } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { ApiQuery } from '@nestjs/swagger';
import { CreateMessagesDto } from './dto/create-message.dto';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Get()
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Page number for pagination',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Number of items per page',
  })
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,  // 10 is a better default
  ) {
    return this.messagesService.findAll(page, limit);
  }

  @Post()
  async create(@Body() createMessagesDto: CreateMessagesDto) {
    return this.messagesService.createMultiple(createMessagesDto);
  }

  @Post('seed')
  async createTestData() {
    await this.messagesService.createTestMessages();
    return { message: 'Test data created successfully' };
  }
}
