import { IUserRepository } from '@modules/users/domain/repositories/IUserRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Users from '../infra/typeorm/entities/Users';

@injectable()
export default class ShowUserByEmailService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}
  public async execute(email: string): Promise<Users | undefined> {
    const user = this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User not found');
    }
    return user;
  }
}
