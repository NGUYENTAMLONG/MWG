import { FileValidator } from '@nestjs/common';

export class ImageFileValidator extends FileValidator {
  constructor(maxSize?: number) {
    super({ maxSize });
  }

  isValid(file?: any): boolean | Promise<boolean> {
    if (!file) {
      return true;
    }
    if (!file.mimetype) {
      return false;
    }
    if (!Boolean(file.mimetype.match(/^image\/.+$/))) {
      return false;
    }
    if (this.validationOptions?.maxSize > 0) {
      return file.size < this.validationOptions.maxSize;
    }
    return true;
  }

  buildErrorMessage(): string {
    if (this.validationOptions?.maxSize) {
      return `Validation failed (expected image file, size is less than ${this.validationOptions.maxSize} byte)`;
    }
    return `Validation failed (expected image file)`;
  }
}

export class ArrayImageFilesValidator extends FileValidator {
  constructor(maxSize?: number) {
    super({ maxSize });
  }

  isValid(files?: Express.Multer.File[]): boolean | Promise<boolean> {
    if (!files || !files.length) {
      return true;
    }
    if (files.some((file) => !file.mimetype)) {
      return false;
    }
    if (files.some((file) => !Boolean(file.mimetype.match(/^image\/.+$/)))) {
      return false;
    }
    if (this.validationOptions?.maxSize > 0) {
      return files.every((file) => file.size < this.validationOptions.maxSize);
    }
    return true;
  }

  buildErrorMessage(): string {
    if (this.validationOptions?.maxSize) {
      return `Validation failed (expected array image files, each size is less than ${this.validationOptions.maxSize} byte)`;
    }
    return `Validation failed (expected array image files)`;
  }
}
