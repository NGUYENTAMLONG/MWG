import { SetMetadata } from '@nestjs/common';
import { ROLE_METADATA } from '../constants/app/app.constant';

export const RequireRole = (role: any) => SetMetadata(ROLE_METADATA, role);
