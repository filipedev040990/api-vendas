import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../infra/typeorm/repositories/UsersRepository';
import Users from '../infra/typeorm/entities/Users';

export default class ListUsersService {
  public static async execute(): Promise<Users[]> {
    const userRepository = getCustomRepository(UserRepository);
    return await userRepository.find();
  }
}
