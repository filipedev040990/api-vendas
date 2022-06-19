import { Request, Response } from 'express';
import AuthenticationService from '../services/AuthenticationService';

export default class AuthenticationController {
  public static async create(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;
    const user = await AuthenticationService.execute({ email, password });
    return res.status(200).json(user);
  }
}
