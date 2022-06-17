import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../typeorm/repositories/UsersRepository';
import Users from '../typeorm/entities/Users';

export default class ListUsersService {
  public static async execute(): Promise<Users[]> {
    const userRepository = getCustomRepository(UserRepository);
    return await userRepository.find();
  }
}
