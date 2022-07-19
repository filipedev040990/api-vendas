import { Request, Response } from 'express';
import ResetPasswordService from '../../../services/ResetPasswordService';

export default class ResetPasswordController {
  public static async create(req: Request, res: Response): Promise<Response> {
    const { token, password } = req.body;
    await ResetPasswordService.execute({ token, password });
    return res.status(204).json();
  }
}
