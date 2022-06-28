import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../typeorm/repositories/UsersRepository';
import UserTokensRepository from '../typeorm/repositories/UserTokensRepository';
import EtherealMail from '@config/mail/EtherealMail';

interface IRequest {
  email: string;
}

export default class SendForgotPasswordEmailService {
  public static async execute({ email }: IRequest): Promise<void> {
    const userRepository = getCustomRepository(UserRepository);
    const userTokenRepository = getCustomRepository(UserTokensRepository);

    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw new AppError('User does not exists.');
    }
    const token = await userTokenRepository.generate(user.id);

    //console.log(token);
    await EtherealMail.sendMail({
      to: email,
      body: `Token para recuperação de senha: ${token?.token}`,
    });
  }
}
