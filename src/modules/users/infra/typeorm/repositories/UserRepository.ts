import { ICreateUserRequest } from './../../../services/CreateUserService';
import { IUserRepository } from '@modules/users/domain/repositories/IUserRepository';
import { getRepository, Repository } from 'typeorm';
import Users from '../entities/Users';

export class UserRepository implements IUserRepository {
  private ormRepository: Repository<Users>;
  constructor() {
    this.ormRepository = getRepository(Users);
  }
  public async findByEmail(email: string): Promise<Users | undefined> {
    return this.ormRepository.findOne({ where: { email } });
  }

  public async findByName(name: string): Promise<Users[] | undefined> {
    return this.ormRepository.find({ where: { name } });
  }

  public async findById(id: string): Promise<Users | undefined> {
    return this.ormRepository.findOne({ where: { id } });
  }

  public async create({
    name,
    email,
    password,
  }: ICreateUserRequest): Promise<Users> {
    const user = this.ormRepository.create({ name, email, password });
    return await this.ormRepository.save(user);
  }

  public async save(user: Users): Promise<Users> {
    return await this.ormRepository.save(user);
  }

  public async remove(user: Users): Promise<void> {
    await this.ormRepository.remove(user);
  }

  public async findAll(): Promise<Users[]> {
    return await this.ormRepository.find();
  }
}
