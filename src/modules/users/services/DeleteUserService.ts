import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../typeorm/repositories/UsersRepository';

export default class DeleteUserService {
  public static async execute(id: string): Promise<void> {
    const userRepository = getCustomRepository(UserRepository);
    const user = await userRepository.findById(id);

    if (!user) {
      throw new AppError('User not found');
    }
    await userRepository.remove(user);
  }
}
