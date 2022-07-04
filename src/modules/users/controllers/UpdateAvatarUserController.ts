import { Request, Response } from 'express';
import UpdateAvatarUserService from '../services/UpdateAvatarUserService';
import { instanceToInstance } from 'class-transformer';

export default class UpdateAvatarUserController {
  public static async execute(req: Request, res: Response): Promise<Response> {
    const user = await UpdateAvatarUserService.execute({
      user_id: req.user.id,
      avatarFilename: req.file?.filename as string,
    });
    return res.status(200).json(instanceToInstance(user));
  }
}
