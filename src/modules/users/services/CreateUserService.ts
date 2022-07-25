import { IUser } from './../domain/models/IUser';
import { IUserRepository } from '@modules/users/domain/repositories/IUserRepository';
import AppError from '@shared/errors/AppError';
import { hash } from 'bcryptjs';
import Users from '../infra/typeorm/entities/Users';
import { inject, injectable } from 'tsyringe';

export type ICreateUserRequest = {
  name: string;
  email: string;
  password: string;
};

@injectable()
export default class CreateUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}
  public async execute({
    name,
    email,
    password,
  }: ICreateUserRequest): Promise<Users> {
    const userExists = await this.userRepository.findByEmail(email);

    if (userExists) {
      throw new AppError('Email address already used');
    }

    const password_hashed = await hash(password, 10);

    return this.userRepository.create({
      name,
      email,
      password: password_hashed,
    });
  }
}
