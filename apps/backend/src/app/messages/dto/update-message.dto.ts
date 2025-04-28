import { PartialType } from '@nestjs/swagger';
import { CreateMessagesDto } from './create-message.dto';

export class UpdateMessageDto extends PartialType(CreateMessagesDto) {}
