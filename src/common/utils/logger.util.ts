import { LOGGER_SENSITIVE_PROPERTIES } from '../constants/app/app.constant';

function excludeSensitiveProperties(object: any) {
  if (typeof object !== 'object' || object === null) return;
  for (const sensitiveKey in LOGGER_SENSITIVE_PROPERTIES) {
    for (const key in object) {
      if (key === sensitiveKey) {
        object[key] = LOGGER_SENSITIVE_PROPERTIES[sensitiveKey];
      } else {
        excludeSensitiveProperties(object[key]);
      }
    }
  }
}

export function nonSensitiveLogger(data: any): string {
  data = JSON.parse(JSON.stringify(data));
  excludeSensitiveProperties(data);
  return JSON.stringify(data);
}
