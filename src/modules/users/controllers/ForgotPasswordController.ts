import { Request, Response } from 'express';
import SendForgotPasswordEmailService from '../services/SendForgotPasswordEmailService';

export default class ForgotPasswordController {
  public static async create(req: Request, res: Response): Promise<Response> {
    const { email } = req.body;
    await SendForgotPasswordEmailService.execute({ email });
    return res.status(204).json();
  }
}
