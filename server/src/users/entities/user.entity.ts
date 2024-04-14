import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { UserRole } from '../user.enum';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  first_name: string;

  @Column()
  last_name: string;

  @Column({ unique: true, nullable: false })
  username: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  passwordHash: string;

//   @Column({ nullable: false, default: UserRole.GUEST })
//   role: number;
}
