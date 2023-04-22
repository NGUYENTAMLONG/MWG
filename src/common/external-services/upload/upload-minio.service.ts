import * as aws from 'aws-sdk';
import * as btoa from 'btoa';
import { v4 as uuidv4 } from 'uuid';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { MINIO_S3_CONFIG } from '../../../configs/constants.config';
import { StringUtil } from '../../utils/string.util';
import { COMMON_ERROR } from '../../constants/errors/common-error.constant';

const CONFIG_UPLOAD = {
  PREFIX: 'uploader',
  MIMETYPE: {
    IMAGE: /^image\/(png|jpg|jpeg|heic|webp|svg\+xml|gif)/i,
    IGNORE_HANDLER: /^image\/(gif)/i,
  },
  IMAGE_EXTENSION_DEFAULT: 'jpg',
  LIMIT_SIZE: 5242880,
};

@Injectable()
export class UploadS3Service {
  async uploadPublicFile(file: Express.Multer.File) {
    const s3 = new aws.S3({
      accessKeyId: MINIO_S3_CONFIG.ACCESS_KEY_ID,
      secretAccessKey: MINIO_S3_CONFIG.SECRET_KEY,
      endpoint: MINIO_S3_CONFIG.API_PATH,
      s3ForcePathStyle: true, // needed with minio?
      signatureVersion: 'v4',
    });

    const isValidMimeType = CONFIG_UPLOAD.MIMETYPE.IMAGE.test(file.mimetype);
    if (!isValidMimeType) {
      throw new HttpException(
        {
          message: COMMON_ERROR.INVALID_MIME_TYPE.MESSAGE,
          code: COMMON_ERROR.INVALID_MIME_TYPE.CODE,
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const prefix = `${CONFIG_UPLOAD.PREFIX}/${file.fieldname}`;
    const generatePrefix = uuidv4();
    const generateFileName = StringUtil.toUrl(
      btoa(Date.now().valueOf().toString()),
      true,
    ).toLowerCase();
    const extensionFile = UploadS3Service.getExt(file);
    const keyFileUpload = `${prefix}/${generatePrefix}/${generateFileName}_original${extensionFile}`;
    const uploadResult = await s3
      .upload({
        Bucket: MINIO_S3_CONFIG.BUCKET,
        Body: file.buffer,
        Key: keyFileUpload,
        ContentType: file.mimetype,
      })
      .promise();

    return {
      prefix: prefix,
      key: uploadResult.Key,
      bucket: uploadResult.Bucket,
      name: file.originalname,
    };
  }

  private static getExt(file: Express.Multer.File) {
    return CONFIG_UPLOAD.MIMETYPE.IGNORE_HANDLER.test(file.mimetype) === true
      ? `.${CONFIG_UPLOAD.MIMETYPE.IGNORE_HANDLER.exec(file.mimetype)[1]}`
      : `.${CONFIG_UPLOAD.IMAGE_EXTENSION_DEFAULT}`;
  }
}
