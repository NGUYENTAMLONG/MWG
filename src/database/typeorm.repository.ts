import {
  BaseEntity,
  FindManyOptions,
  FindOneOptions,
  Repository,
} from 'typeorm';
import { IPaginationParams } from './interfaces/pagination.interface';

export class TypeOrmRepository<T extends BaseEntity> {
  public repository: Repository<T>;
  constructor(repository: Repository<T>) {
    this.repository = repository;
  }

  save(data: any): Promise<T> {
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

  async findExistedRecord() {
    return this.repository.find({
      take: 1,
    });
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
    const [result, total] = await this.repository.findAndCount(paramsFinds);

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
}
