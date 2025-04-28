import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray, IsNumber } from 'class-validator';

export class CreateMessagesDto {
  @ApiProperty()
  @IsString()
  message: string;

  @ApiProperty()
  @IsArray()
  @IsNumber({}, { each: true })
  items: any[];
}
