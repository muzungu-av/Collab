import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Единственный идентификатор для всех
  @Column({ unique: true })
  telegramId: string;

  // Дополнительно можно хранить meta
  @Column({ nullable: true })
  firstName?: string;

  @Column({ nullable: true })
  lastName?: string;

  @Column({ nullable: true })
  username?: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;
}