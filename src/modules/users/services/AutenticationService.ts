import AppError from '@shared/errors/AppError';
import { compare } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import Users from '../typeorm/entities/Users';
import { UserRepository } from '../typeorm/repositories/UsersRepository';

interface IRequest {
  email: string;
  password: string;
}

// interface IResponse {
//   user: Users;
//   token: '123456798';
// }

export default class AutenticationService {
  public static async execute({ email, password }: IRequest): Promise<Users> {
    const userRepository = getCustomRepository(UserRepository);

    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw new AppError('Invalid user/password', 401);
    }

    const passwordIsValid = await compare(password, user.password);
    if (!passwordIsValid) {
      throw new AppError('Invalid user/password', 401);
    }
    return user;
  }
}
