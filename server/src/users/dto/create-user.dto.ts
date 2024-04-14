import { Length } from 'class-validator';
export class CreateUserDto {
  @Length(6, 50, {
    message: 'Password length Must be between 6 and 50 charcters',
  })
  passwordHash: string;
}
