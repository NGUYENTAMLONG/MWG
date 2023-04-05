import { Injectable } from '@nestjs/common';
import { RoleRepository } from './role.repository';
import { Like } from 'typeorm';

@Injectable()
export class RolesService {
  constructor(private readonly roleRepository: RoleRepository) {}

  getList(query): Promise<any> {
    let condition = {};
    if (query.search) {
      condition = [{ name: Like(`%${query.search}%`) }];
    }
    return this.roleRepository.findAllByConditions(
      condition,
      query,
      {},
      {
        rId: true,
        name: true,
      },
    );
  }
}
