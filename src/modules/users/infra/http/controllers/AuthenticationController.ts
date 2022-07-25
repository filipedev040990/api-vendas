import { container } from 'tsyringe';
import { instanceToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import AuthenticationService from '../../../services/AuthenticationService';

export default class AuthenticationController {
  public static async create(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;
    const authenticateUser = container.resolve(AuthenticationService);
    const user = await authenticateUser.execute({ email, password });
    return res.status(200).json(instanceToInstance(user));
  }
}
