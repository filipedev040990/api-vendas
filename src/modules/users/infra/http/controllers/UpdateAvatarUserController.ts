import { Request, Response } from 'express';
import UpdateAvatarUserService from '../../../services/UpdateAvatarUserService';
import { instanceToInstance } from 'class-transformer';
import { container } from 'tsyringe';

export default class UpdateAvatarUserController {
  public static async execute(req: Request, res: Response): Promise<Response> {
    const updateAvatar = container.resolve(UpdateAvatarUserService);
    const user = await updateAvatar.execute({
      user_id: req.user.id,
      avatarFilename: req.file?.filename as string,
    });
    return res.status(200).json(instanceToInstance(user));
  }
}
