import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateCustomerService from '../../../services/CreateCustomerService';
import DeleteCustomerService from '../../../services/DeleteCustomerService';
import ListCustomerById from '../../../services/ListCustomerByIdService';
import ListCustomersService from '../../../services/ListCustomersService';
import UpdateCustomerService from '../../../services/UpdateCustomerService';

export default class CustomerController {
  public async index(req: Request, res: Response): Promise<Response> {
    const page = req.query.page ? Number(req.query.page) : 1;
    const limit = req.query.limit ? Number(req.query.limit) : 15;

    const listCustomers = container.resolve(ListCustomersService);
    const customers = await listCustomers.execute({ page, limit });

    return res.status(200).json(customers);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { name, email } = req.body;

    const createCustomer = container.resolve(CreateCustomerService);

    const customer = await createCustomer.execute({ name, email });
    return res.status(201).json(customer);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { name, email } = req.body;
    const { id } = req.params;

    const customer = await UpdateCustomerService.execute({ id, name, email });
    return res.status(200).json(customer);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    await DeleteCustomerService.execute(id);
    return res.status(204).json({});
  }

  public async listById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const customer = await ListCustomerById.execute(id);
    return res.status(200).json(customer);
  }
}
