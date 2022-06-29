import AppError from '@shared/errors/AppError';
import { compare, hash } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import Users from '../typeorm/entities/Users';
import { UserRepository } from '../typeorm/repositories/UsersRepository';

interface IRequest {
  id: string;
  name: string;
  email: string;
  password?: string;
  old_password?: string;
}
export default class UpdateUserService {
  public static async execute({
    id,
    name,
    email,
    password,
    old_password,
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

    if (password && !old_password) {
      throw new AppError('Old password is required.');
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password);

      if (!checkOldPassword) {
        throw new AppError('Old password does not match.');
      }
    }

    user.name = name;
    user.email = email;
    user.password = await hash(password as string, 10);

    return await userRepository.save(user);
  }
}
