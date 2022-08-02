import { Request, Response } from 'express';
import CreateUserService from '../../../services/CreateUserService';
import DeleteUserService from '../../../services/DeleteUserService';
import ListUsersService from '../../../services/ListUsersService';
import ShowUserByEmailService from '../../../services/ShowUserByEmailService';
import ShowUserByIdService from '../../../services/ShowUserByIdService';
import UpdateUserService from '../../../services/UpdateUserService';
import { instanceToInstance } from 'class-transformer';
import { container } from 'tsyringe';

export default class UserController {
  public static async index(req: Request, res: Response): Promise<Response> {
    const listUser = container.resolve(ListUsersService);
    const users = await listUser.execute();
    return res.status(200).json(instanceToInstance(users));
  }

  public static async create(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body;
    const createUser = container.resolve(CreateUserService);
    const user = await createUser.execute({ name, email, password });
    return res.status(201).json(instanceToInstance(user));
  }

  public static async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { name, email, password, old_password } = req.body;
    const userUpdate = container.resolve(UpdateUserService);
    const user = await userUpdate.execute({
      id,
      name,
      email,
      password,
      old_password,
    });

    return res.status(200).json(instanceToInstance(user));
  }

  public static async showById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const listUser = container.resolve(ShowUserByIdService);
    const user = await listUser.execute(id);

    return res.status(200).json(instanceToInstance(user));
  }

  public static async showByEmail(
    req: Request,
    res: Response,
  ): Promise<Response> {
    const { email } = req.params;
    const showUserByEmail = container.resolve(ShowUserByEmailService);
    const user = await showUserByEmail.execute(email);

    return res.status(200).json(instanceToInstance(user));
  }

  public static async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const deleteUser = container.resolve(DeleteUserService);
    await deleteUser.execute(id);
    return res.status(200).json({});
  }
}
