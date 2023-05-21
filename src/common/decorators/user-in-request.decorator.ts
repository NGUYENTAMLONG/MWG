import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { PayloadType } from 'aws-sdk/clients/iotevents';
import * as jwt from 'jsonwebtoken';

export const UserInRequest = createParamDecorator(
  (data: string | undefined, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization;
    const decodedJwt = jwt.decode(token.split(' ')[1]) as PayloadType;
    request.user.id = decodedJwt['sub'];
    request.user.isAdministrator = decodedJwt['isAdministrator'];
    if (!data || !request.user[data]) return request.user;
    return request.user[data];
  },
);
