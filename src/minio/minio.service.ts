import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { get } from 'http';
import { InjectMinio, MINIO_CONNECTION } from 'nestjs-minio';
import { map } from 'rxjs';

@Injectable()
export class MinioService {
  private readonly nameBucket: string;

  constructor(@Inject(MINIO_CONNECTION) private readonly minio) {
    this.nameBucket = 'reddit-content-posted';
    const exist = this.minio.bucketExists(this.nameBucket);
    if (!exist) {
      throw new InternalServerErrorException('Bucket not exist');
    }
  }

  async getUrlPostsImages(posts) {
    try {
      const data = await this.mapObjectToUrl(posts);

      return data;
    } catch (error) {
      throw new InternalServerErrorException('Error fetching URLs');
    }
  }

  private async getUrlFiles(nameBucket = this.nameBucket, filename, expire) {
    return await this.minio.presignedGetObject(nameBucket, filename, expire);
  }

  private mapObjectToUrl(object) {
    object.map(async (post) => {
      if (post.filename) {
        const url = await this.getUrlFiles(this.nameBucket, post.filename, 24 * 60 * 60);
        post.url = url;
      }
      return post;
    });
    return object;
  }
}
