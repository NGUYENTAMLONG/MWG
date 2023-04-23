import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('permissions')
@Controller({ version: ['1'], path: 'permissions' })
export class PermissionsController {}
