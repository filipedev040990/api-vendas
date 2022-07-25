import { IUserRepository } from '@modules/users/domain/repositories/IUserRepository';
import { IUserTokensRepository } from './../domain/repositories/IUserTokensRepository';
import AppError from '@shared/errors/AppError';
import { hash } from 'bcryptjs';
import { addHours, isAfter } from 'date-fns';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  token: string;
  password: string;
}

@injectable()
export default class ResetPasswordService {
  constructor(
    @inject('UserTokensRepository')
    private userTokenRepository: IUserTokensRepository,

    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}
  public async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await this.userTokenRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('Token does not exists.');
    }

    const user = await this.userRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError('User does not exists');
    }

    const tokenCreatedAt = userToken.created_at;
    const tokenCreatedAtAddedTwoHours = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), tokenCreatedAtAddedTwoHours)) {
      throw new AppError('Token expired');
    }

    user.password = await hash(password, 10);
    await this.userRepository.save(user);
  }
}
