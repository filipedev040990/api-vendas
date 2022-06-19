import { Request, Response } from 'express';
import CreateSessionService from '../services/AutenticationService';

export default class SessionController {
  public static async create(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;
    const user = await CreateSessionService.execute({ email, password });
    return res.status(200).json(user);
  }
}
