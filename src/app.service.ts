import { Injectable, Logger } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { config } from 'dotenv';
config();

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
    async upload(file) {
        const { originalname } = file;
        console.log("file from client: ",{file})
        console.log("env: ",{
          accessKeyId: process.env.ACCESS_KEY_ID,
          secretAccessKey: process.env.SECRET_KEY,
      })
        const bucketS3 = 'my-bucket-16';
        await this.uploadS3(file.buffer, bucketS3, originalname);
    }

    async uploadS3(file, bucket, name) {
        const s3 = this.getS3();
        const params = {
            Bucket: bucket,
            Key: String(name),
            Body: file,
            ACL: "public-read",
        };
        return new Promise((resolve, reject) => {
            s3.upload(params, (err, data) => {
            if (err) {
                Logger.error(err);
                reject(err.message);
            }
            console.log("file response: ",{data})
            resolve(data);
            });
        });
    }

    getS3() {
        return new S3({
            accessKeyId: process.env.ACCESS_KEY_ID,
            secretAccessKey: process.env.SECRET_KEY,
        });
    }
}
