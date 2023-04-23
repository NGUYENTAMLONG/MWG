import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class StringUtil {
  /**
   * Converts a string to an url friendly string
   * @function toUrl
   * @param str input
   * @param replaceSymbols replaces all the symbols by a specific symbol
   * @param symbolReplacing the symbol replacing
   */
  public static toUrl(str: string, replaceSymbols?: boolean, symbolReplacing?: string): string {
    symbolReplacing = symbolReplacing || '-';
    if (!str) return '';
    str = str.replace(/[àáạảãâầấậẩẫăằắặẳẵ]/g, 'a');
    str = str.replace(/[èéẹẻẽêềếệểễ]/g, 'e');
    str = str.replace(/[ìíịỉĩ]/g, 'i');
    str = str.replace(/[òóọỏõôồốộổỗơờớợởỡ]/g, 'o');
    str = str.replace(/[ùúụủũưừứựửữ]/g, 'u');
    str = str.replace(/[ỳýỵỷỹ]/g, 'y');
    str = str.replace(/đ/g, 'd');
    str = str.replace(/[ÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴ]/g, 'A');
    str = str.replace(/[ÈÉẸẺẼÊỀẾỆỂỄ]/g, 'E');
    str = str.replace(/[ÌÍỊỈĨ]/g, 'I');
    str = str.replace(/[ÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠ]/g, 'O');
    str = str.replace(/[ÙÚỤỦŨƯỪỨỰỬỮ]/g, 'U');
    str = str.replace(/[ỲÝỴỶỸ]/g, 'Y');
    str = str.replace(/Đ/g, 'D');
    str = str.replace(/"/g, '');
    if (replaceSymbols) {
      str = str.replace(/[!@$%^*()+=<>?\/,.:' '&#\[]/g, symbolReplacing);
      str = str.replace(/-+-/g, symbolReplacing); // replaces double dash (--) by single (-)
      str = str.replace(/^-+|-+$/g, ''); // removes dash from both sides of string
    }
    return str;
  }

  /**
   * generates a random string
   * @function genRandomString
   * @param {number} length - Length of the random string.
   */
  public static genRandomString(length: number): string {
    return crypto
      .randomBytes(Math.ceil(length / 2))
      .toString('hex')
      .slice(0, length);
  }
}
