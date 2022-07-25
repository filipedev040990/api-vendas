import { IUserTokensRepository } from './../../../domain/repositories/IUserTokensRepository';
import { Repository, getRepository } from 'typeorm';
import UserTokens from '../entities/UserTokens';

export class UserTokensRepository implements IUserTokensRepository {
  private ormRepository: Repository<UserTokens>;
  constructor() {
    this.ormRepository = getRepository(UserTokens);
  }
  public async findByToken(token: string): Promise<UserTokens | undefined> {
    return this.ormRepository.findOne({ where: { token } });
  }

  public async generate(user_id: string): Promise<UserTokens> {
    const userToken = await this.ormRepository.create({ user_id });
    return await this.ormRepository.save(userToken);
  }
}
