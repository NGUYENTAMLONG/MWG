import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { RolesService } from './roles.service';
import { QueriesDto } from './dtos/params.dto';

@Controller('roles')
export class RolesController {
  constructor(private readonly roleService: RolesService) {}

  @Get('')
  getList(@Query() queries: QueriesDto): Promise<any> {
    return this.roleService.getList(queries);
  }
}
