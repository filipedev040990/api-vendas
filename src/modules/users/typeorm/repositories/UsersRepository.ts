import { EntityRepository, Repository } from 'typeorm';
import Users from '../entities/Users';

@EntityRepository(Users)
export class UserRepository extends Repository<Users> {
  public async findByEmail(email: string): Promise<Users | undefined> {
    return this.findOne({ where: { email } });
  }

  public async findByName(name: string): Promise<Users[] | undefined> {
    return this.find({ where: { name } });
  }

  public async findById(id: string): Promise<Users | undefined> {
    return this.findOne({ where: { id } });
  }
}
