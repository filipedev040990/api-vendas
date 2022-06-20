import AppError from '@shared/errors/AppError';
import path from 'path';
import uploadConfig from '@config/upload';
import { getCustomRepository } from 'typeorm';
import Users from '../typeorm/entities/Users';
import { UserRepository } from '../typeorm/repositories/UsersRepository';
import fs from 'fs';

interface IRequest {
  user_id: string;
  avatarFilename: string;
}

export default class UpdateAvatarUserService {
  public static async execute({
    user_id,
    avatarFilename,
  }: IRequest): Promise<Users> {
    const userRepository = getCustomRepository(UserRepository);
    const user = await userRepository.findById(user_id);

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
    return await userRepository.save(user);
  }
}
