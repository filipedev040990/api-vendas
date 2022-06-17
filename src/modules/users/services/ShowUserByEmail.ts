import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Users from '../typeorm/entities/Users';
import { UserRepository } from '../typeorm/repositories/UsersRepository';

export default class ShowUserByEmail {
  public static async execute(email: string): Promise<Users | undefined> {
    const userRepository = getCustomRepository(UserRepository);
    const user = userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User not found');
    }

    return user;
  }
}
