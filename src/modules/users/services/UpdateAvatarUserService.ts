import { IUser } from './../domain/models/IUser';
import { IUserRepository } from '@modules/users/domain/repositories/IUserRepository';
import AppError from '@shared/errors/AppError';
import path from 'path';
import uploadConfig from '@config/upload';
import fs from 'fs';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  user_id: string;
  avatarFilename: string;
}

@injectable()
export default class UpdateAvatarUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}
  public async execute({ user_id, avatarFilename }: IRequest): Promise<IUser> {
    const user = await this.userRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found');
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }
    user.avatar = avatarFilename;
    return await this.userRepository.save(user);
  }
}
