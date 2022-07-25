import { IUserRepository } from './../domain/repositories/IUserRepository';
import AppError from '@shared/errors/AppError';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  email: string;
  token: string;
}

@injectable()
export default class AuthenticationService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}
  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new AppError('Invalid user/password', 401);
    }

    const passwordIsValid = await compare(password, user.password);
    if (!passwordIsValid) {
      throw new AppError('Invalid user/password', 401);
    }

    const token = sign(
      { id: user.id, email: user.email },
      authConfig.jwt.secret as string,
      {
        expiresIn: authConfig.jwt.expiresIn,
      },
    );
    return {
      email: user.email,
      token: token,
    };
  }
}
