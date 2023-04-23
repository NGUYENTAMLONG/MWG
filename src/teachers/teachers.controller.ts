import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('teachers')
@Controller({ version: ['1'], path: 'teachers' })
export class TeachersController {}
