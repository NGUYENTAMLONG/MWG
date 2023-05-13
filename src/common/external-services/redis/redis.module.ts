import { DynamicModule, Module } from '@nestjs/common';
import { Redis } from 'ioredis';

import { REDIS_CONNECTION } from './redis.const';
import { RedisService } from './redis.service';

export interface ConfigModuleOptions {
  redisUri: string;
}

@Module({})
export class RedisModule {
  static forRoot(options: ConfigModuleOptions): DynamicModule {
    return {
      module: RedisModule,
      providers: [
        {
          provide: REDIS_CONNECTION,
          useFactory: async (): Promise<any> => {
            const connection = new Redis(options.redisUri);
            return connection;
          },
        },
        RedisService,
      ],
      exports: [RedisService],
    };
  }
}
