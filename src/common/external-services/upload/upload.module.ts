import { Module } from '@nestjs/common';
import { UploadS3Service } from './upload-minio.service';

@Module({
  providers: [UploadS3Service],
  exports: [UploadS3Service],
})
export class UploadModule {}
