import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Users from '../infra/typeorm/entities/Users';
import { UserRepository } from '../infra/typeorm/repositories/UsersRepository';

export default class ShowUserByIdService {
  public static async execute(id: string): Promise<Users | undefined> {
    const userRepository = getCustomRepository(UserRepository);
    const user = await userRepository.findById(id);

    if (!user) {
      throw new AppError('User not found');
    }
    return user;
  }
}
