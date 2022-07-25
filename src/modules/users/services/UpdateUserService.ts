import { IUser } from './../domain/models/IUser';
import { IUserRepository } from '@modules/users/domain/repositories/IUserRepository';
import AppError from '@shared/errors/AppError';
import { compare, hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  id: string;
  name: string;
  email: string;
  password?: string;
  old_password?: string;
}
@injectable()
export default class UpdateUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}
  public async execute({
    id,
    name,
    email,
    password,
    old_password,
  }: IRequest): Promise<IUser> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new AppError('User not found');
    }

    const emailExists = await this.userRepository.findByEmail(email);

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

    return await this.userRepository.save(user);
  }
}
