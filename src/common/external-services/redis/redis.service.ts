import { Inject, Injectable } from '@nestjs/common';
import Redis from 'ioredis';

import { REDIS_CONNECTION } from './redis.const';

@Injectable()
export class RedisService {
  private connection: Redis;
  constructor(@Inject(REDIS_CONNECTION) connection: Redis) {
    this.connection = connection;
  }

  async getValueByKey(key: any): Promise<string> {
    return new Promise((resolve, reject) => {
      this.connection.get(key, (error, value) => {
        if (error) {
          reject(error);
        } else {
          resolve(value);
        }
      });
    });
  }

  async setValueByKey(key: any, value: any, exp: any) {
    return new Promise((resolve, reject) => {
      this.connection.set(key, value, 'EX', exp, (error, value) => {
        if (error) {
          reject(error);
        } else {
          resolve(value);
        }
      });
    });
  }

  async deleteValueByKey(key: any) {
    const keyDel = await this.connection.del(key);
    return keyDel;
  }
}
