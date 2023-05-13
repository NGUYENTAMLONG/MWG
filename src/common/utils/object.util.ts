import { Injectable } from '@nestjs/common';

@Injectable()
export class ObjectUtil {
  /**
   * generates a random string
   * @function genRandomString
   * @param {number} length - Length of the random string.
   */
  public static pick<T extends object, U extends keyof T>(obj: T, paths: Array<U>): Pick<T, U> {
    const ret = Object.create(null);
    for (const k of paths) {
      ret[k] = obj[k];
    }
    return ret;
  }
}
