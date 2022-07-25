import { IUserTokensRepository } from './../domain/repositories/IUserTokensRepository';
import { IUserRepository } from '@modules/users/domain/repositories/IUserRepository';
import AppError from '@shared/errors/AppError';
import path from 'path';
import EtherealMail from '@config/mail/EtherealMail';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  email: string;
}

@injectable()
export default class SendForgotPasswordEmailService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('UserTokensRepository')
    private userTokenRepository: IUserTokensRepository,
  ) {}
  public async execute({ email }: IRequest): Promise<void> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new AppError('User does not exists.');
    }
    const token = await this.userTokenRepository.generate(user.id);

    const forgotPasswordTemplate = path.join(
      __dirname,
      '../views/forgot_password.hbs',
    );

    await EtherealMail.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: '[API Vendas] Recuperação de Senha',
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: user.name,
          token: token?.token,
          link: `http://localhost:3333/reset_password?token=${token.token}`,
        },
      },
    });
  }
}
