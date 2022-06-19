import AppError from '@shared/errors/AppError';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { getCustomRepository } from 'typeorm';
import authConfig from '@config/auth';
import { UserRepository } from '../typeorm/repositories/UsersRepository';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  email: string;
  token: string;
}

export default class AuthenticationService {
  public static async execute({
    email,
    password,
  }: IRequest): Promise<IResponse> {
    const secret_key = process.env.SECRET_KEY_JWT as string;

    const userRepository = getCustomRepository(UserRepository);

    const user = await userRepository.findByEmail(email);
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
