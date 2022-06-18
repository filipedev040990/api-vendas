import AppError from '@shared/errors/AppError';
import { hash } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import Users from '../typeorm/entities/Users';
import { UserRepository } from '../typeorm/repositories/UsersRepository';

interface IRequest {
  id: string;
  name: string;
  email: string;
  password: string;
}
export default class UpdateUserService {
  public static async execute({
    id,
    name,
    email,
    password,
  }: IRequest): Promise<Users> {
    const userRepository = getCustomRepository(UserRepository);
    const user = await userRepository.findById(id);

    if (!user) {
      throw new AppError('User not found');
    }

    const emailExists = await userRepository.findByEmail(email);

    if (emailExists && emailExists.id !== user.id) {
      throw new AppError('Email address already used');
    }

    user.name = name;
    user.email = email;
    user.password = await hash(password, 10);

    return await userRepository.save(user);
  }
}
