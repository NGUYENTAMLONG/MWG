import { SetMetadata } from '@nestjs/common';
import { PUBLIC_ROUTE_METADATA } from '../constants/app/app.constant';

export const PublicRoute = () => SetMetadata(PUBLIC_ROUTE_METADATA, true);
