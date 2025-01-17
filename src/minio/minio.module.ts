import { Module } from '@nestjs/common';
import { MinioService } from './minio.service';
import { NestMinioModule } from 'nestjs-minio';
import { configEnvMinio } from '@/config';

@Module({
  imports: [
    NestMinioModule.register({
      endPoint: configEnvMinio.endPoint,
      port: parseInt(configEnvMinio.port),
      useSSL: false,
      accessKey: configEnvMinio.accessKey,
      secretKey: configEnvMinio.secretKey,
    }),
  ],
  exports: [MinioService],
  providers: [MinioService],
})
export class MinioModule {}
