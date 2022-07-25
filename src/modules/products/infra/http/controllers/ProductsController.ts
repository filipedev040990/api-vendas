import { container } from 'tsyringe';
import { Request, Response } from 'express';
import CreateProductService from '../../../services/CreateProductService';
import DeleteProductService from '../../../services/DeleteProductService';
import ListProductService from '../../../services/ListProductsService';
import ShowProductService from '../../../services/ShowProductService';
import UpdateProductService from '../../../services/UpdateProductService';

export default class ProductsController {
  public static async index(req: Request, res: Response): Promise<Response> {
    const listProducts = container.resolve(ListProductService);
    const products = await listProducts.execute();
    return res.status(200).json(products);
  }

  public static async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const listProducts = container.resolve(ShowProductService);
    const product = await listProducts.execute(id);
    return res.status(200).json(product);
  }

  public static async create(req: Request, res: Response): Promise<Response> {
    const { name, price, quantity } = req.body;
    const createProduct = container.resolve(CreateProductService);
    const product = await createProduct.execute({
      name,
      price,
      quantity,
    });
    return res.status(201).json(product);
  }

  public static async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { name, price, quantity } = req.body;
    const updateProduct = container.resolve(UpdateProductService);
    const product = await updateProduct.execute({
      id,
      name,
      price,
      quantity,
    });
    return res.status(201).json(product);
  }

  public static async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const deleteProduct = container.resolve(DeleteProductService);
    await deleteProduct.execute(id);
    return res.status(200).json({});
  }
}
