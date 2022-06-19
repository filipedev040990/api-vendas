import { Request, Response } from 'express';
import CreateSessionService from '../services/CreateSessionService';

export default class SessionController {
  public static async execute(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;
    const user = await CreateSessionService.execute({ email, password });
    return res.status(200).json(user);
  }
}
