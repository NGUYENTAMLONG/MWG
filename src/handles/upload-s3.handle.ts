import { Logger } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { config } from 'dotenv';
import { result } from 'lodash';
config();

async function uploadS3(file: any, folder: string) {
  const { originalname } = file;
  const bucketS3 = 'my-bucket-16';
  const uploaded = await storeBuckerS3(
    file.buffer,
    bucketS3,
    folder + '/' + originalname,
  );
  return uploaded;
}
async function storeBuckerS3(file, bucket, name) {
  const s3 = await getS3();
  const params = {
    Bucket: bucket,
    Key: String(name),
    Body: file,
    ACL: 'public-read',
  };
  return new Promise((resolve, reject) => {
    s3.upload(params, (err, data) => {
      if (err) {
        Logger.error(err);
        reject(err.message);
      }
      resolve(data);
    });
  });
}

async function getS3() {
  return new S3({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_KEY,
  });
}
export { uploadS3 };
