import { Request, Response } from 'express';
import CreateUserService from '../services/CreateUserService';
import DeleteUserService from '../services/DeleteUserService';
import ListUsersService from '../services/ListUsersService';
import ShowUserByEmailService from '../services/ShowUserByEmailService';
import ShowUserByIdService from '../services/ShowUserByIdService';
import UpdateUserService from '../services/UpdateUserService';

export default class UserController {
  public static async index(req: Request, res: Response): Promise<Response> {
    const users = await ListUsersService.execute();
    return res.status(200).json(users);
  }

  public static async create(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body;
    const user = await CreateUserService.execute({ name, email, password });
    return res.status(201).json(user);
  }

  public static async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { name, email, password } = req.body;
    const user = await UpdateUserService.execute({ id, name, email, password });

    return res.status(200).json(user);
  }

  public static async showById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const user = await ShowUserByIdService.execute(id);

    return res.status(200).json(user);
  }

  public static async showByEmail(
    req: Request,
    res: Response,
  ): Promise<Response> {
    const { email } = req.params;
    const user = await ShowUserByEmailService.execute(email);

    return res.status(200).json(user);
  }

  public static async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    await DeleteUserService.execute(id);
    return res.status(200).json({});
  }
}
