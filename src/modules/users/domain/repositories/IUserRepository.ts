import { IUser } from './../models/IUser';
import Users from '@modules/users/infra/typeorm/entities/Users';
import { ICreateUserRequest } from '@modules/users/services/CreateUserService';

export interface IUserRepository {
  findByEmail(email: string): Promise<Users | undefined>;
  findByName(name: string): Promise<Users[] | undefined>;
  findById(id: string): Promise<Users | undefined>;
  create({ name, email, password }: ICreateUserRequest): Promise<Users>;
  save(user: IUser): Promise<IUser>;
  remove(user: IUser): Promise<void>;
  findAll(): Promise<Users[]>;
}
