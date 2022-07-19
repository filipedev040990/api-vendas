import AppError from '@shared/errors/AppError';
import { hash } from 'bcryptjs';
import { addHours, isAfter } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../infra/typeorm/repositories/UsersRepository';
import UserTokensRepository from '../infra/typeorm/repositories/UserTokensRepository';

interface IRequest {
  token: string;
  password: string;
}

export default class ResetPasswordService {
  public static async execute({ token, password }: IRequest): Promise<void> {
    const userTokenRepository = getCustomRepository(UserTokensRepository);
    const userRepository = getCustomRepository(UserRepository);

    const userToken = await userTokenRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('Token does not exists.');
    }

    const user = await userRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError('User does not exists');
    }

    const tokenCreatedAt = userToken.created_at;
    const tokenCreatedAtAddedTwoHours = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), tokenCreatedAtAddedTwoHours)) {
      throw new AppError('Token expired');
    }

    user.password = await hash(password, 10);
    await userRepository.save(user);
  }
}
