import { IUserRepository } from '@modules/users/domain/repositories/IUserRepository';
import Users from '../infra/typeorm/entities/Users';
import { inject, injectable } from 'tsyringe';

@injectable()
export default class ListUsersService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}
  public async execute(): Promise<Users[]> {
    return await this.userRepository.findAll();
  }
}
