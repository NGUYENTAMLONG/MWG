import {
  BaseEntity,
  DeepPartial,
  DeleteResult,
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  Repository,
  UpdateResult,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { IPagination, IPaginationParams } from '../interfaces/pagination.interface';

export class BaseRepository<T extends BaseEntity> {
  public repository: Repository<T>;

  constructor(repository: Repository<T>) {
    this.repository = repository;
  }

  create(data?: DeepPartial<T>): T {
    return this.repository.create(data);
  }

  save(data: T): Promise<T> {
    return this.repository.save(data);
  }

  saveMultiple(data: T[]): Promise<T[]> {
    return this.repository.save(data);
  }

  findOne(options: FindOneOptions<T>): Promise<T> {
    return this.repository.findOne(options);
  }

  findAll(options?: FindManyOptions<T>): Promise<T[]> {
    return this.repository.find(options);
  }

  async findPaginate(paginationParams: IPaginationParams = {}, options?: FindOneOptions): Promise<IPagination<T>> {
    const page = paginationParams.page > 0 ? paginationParams.page : 1;
    const pageSize = paginationParams.pageSize > 0 ? paginationParams.pageSize : 20;

    const findOptions: FindManyOptions = {
      take: pageSize,
      skip: (page - 1) * pageSize,
      ...options,
    };

    if (paginationParams.sortBy) {
      findOptions.order = {
        [paginationParams.sortBy]: paginationParams.sortOrder == 'desc' ? 'DESC' : 'ASC',
      };
    }

    const [items, totalItem] = await this.repository.findAndCount(findOptions);
    const totalPage = totalItem ? Math.ceil(totalItem / pageSize) : 1;
    return {
      data: items,
      page: page,
      pageSize: pageSize,
      totalPage: totalPage,
      totalItem: totalItem,
    };
  }

  update(
    criteria: string | number | string[] | Date | number[] | Date[] | FindOptionsWhere<T>,
    data: QueryDeepPartialEntity<T>,
  ): Promise<UpdateResult> {
    return this.repository.update(criteria, data);
  }

  delete(criteria: string | number | string[] | Date | number[] | Date[] | FindOptionsWhere<T>): Promise<DeleteResult> {
    return this.repository.delete(criteria);
  }
}
