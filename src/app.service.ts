import { Injectable, Logger } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import * as fs from 'fs';
import * as csv from 'csv-parser';
import { config } from 'dotenv';
import * as path from 'path';
import * as XlsxPopulate from 'xlsx-populate';
import * as XLSX from 'xlsx';

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


  async uploadCSV(file){
    return file
  }
  async readCSV(){
    const results = [];
    let arr = []
    const csvPath = path.join(__dirname,"/assets/csv/data/temp.csv");
      fs.createReadStream("./src/assets/csv/data/temp.csv")
        .pipe(csv())
        .on('data', (data) => {
          results.push(data)})
          .on('end', () => {
          console.log(results)
          // console.log(results)
         }).on("error", function (error) {
           console.log(error.message);
         });
         return {arr}
    }
  
// -------------------------------------------------------------
// generateExcelFromJson
  async  generateExcelFromJson() {
    const jsonData = [
      {
        // qId: "qId-00c7ca69-c6a1-4a39-9981-d01f1d1e696d",
        question: "What does the Fox say?",
        explain: "Explanation for the question1",
        note: "Note for the question 1",
        suggest: "Suggest for the question1",
        metadata: "{}",
        attachments: [],
        answers: [
          {
            // aId: "aId-332e74fd-a878-46a7-b7ec-62dd149295e3",
            content: "my answer 123",
            correct: true,
            metadata: "{}"
          },
          {
            // aId: "aId-d509ad7c-ca66-4f52-b30e-27713778e360",
            content: "my answer 2",
            correct: false,
            metadata: "{}"
          }
        ]
      },
      {
        question: "Question 2?",
        explain: "Explanation for the question 2",
        note: "Note for the question 2",
        suggest: "Suggest for the question 2",
        metadata: "{}",
        attachments: [],
        answers: [
          {
            content: "my answer 1",
            correct: false,
            metadata: "{}"
          },
          {
            content: "my answer 2",
            correct: true,
            metadata: "{}"
          },
          {
            content: "my answer 3",
            correct: false,
            metadata: "{}"
          },
          {
            content: "my answer 4",
            correct: false,
            metadata: "{}"
          }
        ]
      },
      {
        question: "Question 3?",
        explain: "Explanation for the question 3",
        note: "Note for the question 3",
        suggest: "Suggest for the question 3",
        metadata: "{ important:true }",
        attachments: [],
        answers: [
          {
            content: "my answer 1",
            correct: false,
            metadata: "{}"
          },
          {
            content: "my answer 2",
            correct: true,
            metadata: "{}"
          },
          {
            content: "my answer 3",
            correct: true,
            metadata: "{}"
          },
          {
            content: "my answer 4",
            correct: false,
            metadata: "{}"
          }
        ]
      },
      {
        question: "what is the LOL means?",
        explain: "Explanation for the question 4",
        note: "Note for the question 4",
        suggest: "Suggest for the question 4",
        metadata: "{ important:true, data: 'ok' }",
        attachments: [],
        answers: [
          {
            content: "answer 1",
            correct: false,
            metadata: "{}"
          },
          {
            content: "answer 2",
            correct: true,
            metadata: "{}"
          },
          {
            content: "answer 3",
            correct: true,
            metadata: "{}"
          },
          {
            content: "answer 4",
            correct: false,
            metadata: "{}"
          }
        ]
      } 
    ];
    
    const filePath = './src/assets/csv/data/excel.xlsx';
    
        // Flatten the nested JSON data
    const flattenedData = jsonData.map((item) => {
      const flattenedItem = {
        question: item.question,
        explain: item.explain,
        note: item.note,
        suggest: item.suggest,
        metadata: item.metadata,
      };

      const testFlat = Object.keys(item);
      const obj = {};
      testFlat.forEach(elm=>{
        obj[elm] = item[elm]
      })
      delete obj['answers'];
      delete obj['attachments'];

      // console.log(obj);
      // console.log(flattenedItem);

      item.answers.forEach((answer, index) => {
        flattenedItem[`answer_${index}_content`] = answer.content;
        flattenedItem[`answer_${index}_correct`] = answer.correct;
        flattenedItem[`answer_${index}_metadata`] = answer.metadata;
      });

      return flattenedItem;
    });

    // Create a new workbook and convert the flattened data to a worksheet
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(flattenedData);

    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    // Save the workbook to an Excel file
    XLSX.writeFile(workbook, filePath);
  }
// -------------------------------------------------------------
// generateJsonFromExcel
  generateJsonFromExcel() {
    const filePath = './src/assets/csv/data/excel.xlsx';
    
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        
    // Convert the JSON data to the desired format
    const nestedJsonData = this.convertToNestedJson(jsonData);

    return nestedJsonData;
  }
   convertToNestedJson(data) {
    const result = [];
    const headers = data[0];
  
    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      const item = {};
  
      for (let j = 0; j < headers.length; j++) {
        const header = headers[j];
        const value = row[j];
  
        if (header.includes('.')) {
          const keys = header.split('.');
          let nestedObj = item;
  
          for (let k = 0; k < keys.length - 1; k++) {
            const key = keys[k];
            nestedObj[key] = nestedObj[key] || {};
            nestedObj = nestedObj[key];
          }
  
          nestedObj[keys[keys.length - 1]] = value;
        } else {
          item[header] = value;
        }
      }
  
      result.push(item);
    }
    return this.convertToNestedJsonDeeper(result)
  }
   convertToNestedJsonDeeper(data) {
    const result = [];
  
    for (let i = 0; i < data.length; i++) {
      const item = {
        question: data[i].question,
        explain: data[i].explain,
        note: data[i].note,
        suggest: data[i].suggest,
        metadata: data[i].metadata,
        attachments: []
      };
  
      const answers = [];
      let answerIndex = 0;
  
      while (data[i][`answer_${answerIndex}_content`] !== undefined) {
        const answer = {
          content: data[i][`answer_${answerIndex}_content`],
          correct: data[i][`answer_${answerIndex}_correct`],
          metadata: data[i][`answer_${answerIndex}_metadata`]
        };
  
        answers.push(answer);
        answerIndex++;
      }
  
      item["answers"] = answers;
      result.push(item);
    }
  
    return result;
  }
}
