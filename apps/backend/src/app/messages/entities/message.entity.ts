import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string; 

  @Column({ nullable: true })
  parentMessage: string; 

  @CreateDateColumn()
  createdAt: Date;
}
