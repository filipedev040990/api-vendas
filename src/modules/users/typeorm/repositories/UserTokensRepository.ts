import { EntityRepository, Repository } from 'typeorm';
import UserTokens from '../entities/UserTokens';

@EntityRepository(UserTokens)
export default class UserTokensRepository extends Repository<UserTokens> {
  public async findByToken(token: string): Promise<UserTokens | undefined> {
    return this.findOne({ where: { token } });
  }

  public async generate(user_id: string): Promise<UserTokens | undefined> {
    const userToken = await this.create({ user_id });
    return await this.save(userToken);
  }
}
