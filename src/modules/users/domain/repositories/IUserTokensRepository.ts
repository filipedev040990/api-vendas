import UserTokens from '@modules/users/infra/typeorm/entities/UserTokens';

export interface IUserTokensRepository {
  findByToken(token: string): Promise<UserTokens | undefined>;
  generate(user_id: string): Promise<UserTokens>;
}
