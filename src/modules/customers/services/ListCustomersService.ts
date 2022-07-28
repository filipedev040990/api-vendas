import { ICustomerPaginate } from './../domain/models/ICustomerPaginate';
import { ICustomersRepository } from './../domain/repositories/ICustomersRepository';
import { inject, injectable } from 'tsyringe';

interface SearchParams {
  page: number;
  limit: number;
}

@injectable()
export default class ListCustomersService {
  constructor(
    @inject('CustomerRepository')
    private customerRepository: ICustomersRepository,
  ) {}
  public async execute({
    page,
    limit,
  }: SearchParams): Promise<ICustomerPaginate | undefined> {
    const take = limit;
    const skip = (Number(page) - 1) * take;
    return await this.customerRepository.findAll({
      page,
      skip,
      take,
    });
  }
}
