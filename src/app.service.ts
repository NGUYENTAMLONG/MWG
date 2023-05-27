import { Injectable, Logger } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import * as fs from 'fs';
import * as csv from 'csv-parser';
import { config } from 'dotenv';
import * as path from 'path';
import * as XlsxPopulate from 'xlsx-populate';

config();

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async upload(file) {
    const { originalname } = file;
    console.log('file from client: ', { file });
    console.log('env: ', {
      accessKeyId: process.env.ACCESS_KEY_ID,
      secretAccessKey: process.env.SECRET_KEY,
    });
    const bucketS3 = 'my-bucket-16';
    await this.uploadS3(file.buffer, bucketS3, originalname);
  }

  async uploadS3(file, bucket, name) {
    const s3 = this.getS3();
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
        console.log('file response: ', { data });
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
  getViewname() {
    return 'kakaka';
  }

  async uploadCSV(file) {
    return file;
  }
  async readCSV() {
    const results = [];
    let arr = [];
    const csvPath = path.join(__dirname, '/assets/csv/data/temp2.csv');
    fs.createReadStream('./src/assets/csv/data/temp2.csv')
      .pipe(csv())
      .on('data', (data) => {
        results.push(data);
      })
      .on('end', () => {
        console.log(results);
        // console.log(results)
      })
      .on('error', function (error) {
        console.log(error.message);
      });
    return { arr };
  }

  async generateExcelFromJson(jsonData, filePath) {
    const workbook = await XlsxPopulate.fromBlankAsync();
    const sheet = workbook.sheet(0);

    const flattenedData = this.flattenJson(jsonData);
    const columnHeaders = this.getColumnHeaders(flattenedData);

    columnHeaders.forEach((header, index) => {
      sheet.cell(1, index + 1).value(header);
    });

    flattenedData.forEach((row, rowIndex) => {
      Object.keys(row).forEach((key, columnIndex) => {
        sheet.cell(rowIndex + 2, columnIndex + 1).value(row[key]);
      });
    });

    await workbook.toFileAsync(filePath);
  }

  flattenJson(jsonData) {
    const result = {};

    function flatten(obj, prefix = '') {
      for (const key in obj) {
        if (typeof obj[key] === 'object' && obj[key] !== null) {
          flatten(obj[key], prefix + key + '_');
        } else {
          result[prefix + key] = obj[key];
        }
      }
    }

    flatten(jsonData);

    return [result];
  }

  getColumnHeaders(flattenedData) {
    const keys = new Set();

    flattenedData.forEach((row) => {
      Object.keys(row).forEach((key) => {
        keys.add(key);
      });
    });

    return Array.from(keys);
  }
}
