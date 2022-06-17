import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Users from '../typeorm/entities/Users';
import { UserRepository } from '../typeorm/repositories/UsersRepository';

export default class ShowUserService {
  public static async execute(id: string): Promise<Users | undefined> {
    const userRepository = getCustomRepository(UserRepository);
    const user = await userRepository.findById(id);

    if (!user) {
      throw new AppError('User not found');
    }
    return user;
  }
}
