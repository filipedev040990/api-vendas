import { Request, Response } from 'express';
import { container } from 'tsyringe';
import SendForgotPasswordEmailService from '../../../services/SendForgotPasswordEmailService';

export default class ForgotPasswordController {
  public static async create(req: Request, res: Response): Promise<Response> {
    const { email } = req.body;
    const sendForgotEmail = container.resolve(SendForgotPasswordEmailService);
    await sendForgotEmail.execute({ email });
    return res.status(204).json();
  }
}
