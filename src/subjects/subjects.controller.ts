import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('subjects')
@Controller({ version: ['1'], path: 'subjects' })
export class SubjectsController {}
