import { Request, Response } from 'express';
import CreateOrderService from '../services/CreateOrderService';
import ListOrderByIdService from '../services/ListOrderByIdService';
import ListOrderService from '../services/ListOrdersService';

export default class OrdersController {
  public static async index(req: Request, res: Response): Promise<Response> {
    const orders = await ListOrderService.execute();
    return res.status(200).json(orders);
  }

  public static async listById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const order = await ListOrderByIdService.execute(id);
    return res.status(200).json(order);
  }

  public static async create(req: Request, res: Response): Promise<Response>{
    const { customer_id, products } = req.body;
    const order = await CreateOrderService.execute({ customer_id, products });
    return res.status(200).json(order);
  }
}
