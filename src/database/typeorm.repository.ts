import {
  BaseEntity,
  DeepPartial,
  DeleteResult,
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  Repository,
} from 'typeorm';
import { IPaginationParams } from './interfaces/pagination.interface';

export class TypeOrmRepository<T extends BaseEntity> {
  public repository: Repository<T>;

  constructor(repository: Repository<T>) {
    this.repository = repository;
  }

  create(data?: DeepPartial<T>): T {
    return this.repository.create(data);
  }

  save(data: any): Promise<T> {
    return this.repository.save(data);
  }

  saveMultiple(data: T[]): Promise<T[]> {
    return this.repository.save(data);
  }

  update(
    id: string | number | string[] | Date | number[] | Date[],
    data: any,
  ): Promise<any> {
    return this.repository.update(id, data);
  }

  softDelete(
    id: string | number | string[] | Date | number[] | Date[],
  ): Promise<any> {
    return this.repository.softDelete(id);
  }

  restore(
    id: string | number | string[] | Date | number[] | Date[],
  ): Promise<any> {
    return this.repository.restore(id);
  }

  findOne(options: FindOneOptions<T>): Promise<T> {
    return this.repository.findOne(options);
  }

  findOneDeleted(options: FindOneOptions<T>): Promise<T> {
    options['withDeleted'] = true;
    return this.repository.findOne(options);
  }
  async findExistedRecord() {
    return this.repository.find({
      take: 1,
    });
  }

  findAll(options?: FindManyOptions<T>): Promise<T[]> {
    return this.repository.find(options);
  }
  async findAllByConditions(
    conditions: any,
    paginateParams: IPaginationParams,
    join?: any,
    select?: any,
  ) {
    const page =
      paginateParams.page && paginateParams.page > 0
        ? Number(paginateParams.page)
        : 1;
    const pageSize =
      paginateParams.pageSize && paginateParams.pageSize > 0
        ? Number(paginateParams.pageSize)
        : 20;

    const paramsFinds: FindManyOptions = {
      take: pageSize,
      skip: (page - 1) * pageSize,
      where: conditions,
      relations: join,
    };
    if (join) {
      paramsFinds.relations = join;
    }
    if (select) {
      paramsFinds.select = select;
    }
    if (paginateParams.sortBy) {
      paramsFinds.order = {
        [paginateParams.sortBy]:
          paginateParams.sortOrder == 'desc' ? 'DESC' : 'ASC',
      };
    }

    const [result, total] = await this.repository.findAndCount({
      take: pageSize,
      skip: (page - 1) * pageSize,
      where: conditions,
      relations: join,
      select: select,
    });
    const totalPage =
      total % pageSize == 0
        ? total / pageSize
        : Math.floor(total / pageSize) + 1;
    return {
      data: result,
      total: total,
      page: page,
      pageSize: pageSize,
      totalPage: totalPage,
    };
  }
  async findOneByConditions(conditions: FindOneOptions): Promise<T> {
    return this.repository.findOne(conditions);
  }

  delete(
    criteria:
      | string
      | number
      | string[]
      | Date
      | number[]
      | Date[]
      | FindOptionsWhere<T>,
  ): Promise<DeleteResult> {
    return this.repository.delete(criteria);
  }
}
