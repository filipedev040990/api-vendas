import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Users from '../infra/typeorm/entities/Users';
import { UserRepository } from '../infra/typeorm/repositories/UsersRepository';

export default class ShowUserByEmailService {
  public static async execute(email: string): Promise<Users | undefined> {
    const userRepository = getCustomRepository(UserRepository);
    const user = userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User not found');
    }

    return user;
  }
}
