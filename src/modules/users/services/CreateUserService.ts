import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import { UserRepository } from '../typeorm/repositories/UsersRepository';
import Users from '../typeorm/entities/Users';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

export default class CreateUserService {
  public static async execute({
    name,
    email,
    password,
  }: IRequest): Promise<Users> {
    const userRepository = getCustomRepository(UserRepository);
    const userExists = await userRepository.findByEmail(email);

    if (userExists) {
      throw new AppError('Email address already used');
    }

    const password_hashed = await hash(password, 10);

    const user = userRepository.create({
      name,
      email,
      password: password_hashed,
    });
    return await userRepository.save(user);
  }
}
