import { Request, Response } from 'express';
import CreateCustomerService from '../../../services/CreateCustomerService';
import DeleteCustomerService from '../../../services/DeleteCustomerService';
import ListCustomerById from '../../../services/ListCustomerByIdService';
import ListCustomersService from '../../../services/ListCustomersService';
import UpdateCustomerService from '../../../services/UpdateCustomerService';

export default class CustomerController {
  public static async index(req: Request, res: Response): Promise<Response> {
    const customers = await ListCustomersService.execute();
    return res.status(200).json(customers);
  }

  public static async create(req: Request, res: Response): Promise<Response> {
    const { name, email } = req.body;
    const customer = await CreateCustomerService.execute({ name, email });
    return res.status(201).json(customer);
  }

  public static async update(req: Request, res: Response): Promise<Response> {
    const { name, email } = req.body;
    const { id } = req.params;

    const customer = await UpdateCustomerService.execute({ id, name, email });
    return res.status(200).json(customer);
  }

  public static async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    await DeleteCustomerService.execute(id);
    return res.status(204).json({});
  }

  public static async listById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const customer = await ListCustomerById.execute(id);
    return res.status(200).json(customer);
  }
}
