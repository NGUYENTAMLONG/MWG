import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { RolesService } from './roles.service';
import { QueriesDto } from './dtos/params.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('roles')
@Controller({ version: ['1'], path: 'roles' })
export class RolesController {
  constructor(private readonly roleService: RolesService) {}

  @Get('')
  getList(@Query() queries: QueriesDto): Promise<any> {
    return this.roleService.getList(queries);
  }
}
