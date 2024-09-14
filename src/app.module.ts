//Main controllers, services and module
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Module } from '@nestjs/common';
// Config env files
import { ConfigModule } from '@nestjs/config';
// Modules from my app
import { CommentModule } from './comment/comment.module';
import { InteractionModule } from './interaction/interaction.module';
import { PostModule } from './post/post.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TopicsModule } from './topics/topics.module';

@Module({
  
  imports: [
    ConfigModule.forRoot({envFilePath: '.env.development.local'}), 
    TypeOrmModule.forFeature(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: 3306,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASS,
      database: process.env.DATABASE_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      autoLoadEntities: true,
      synchronize: true,
      logging: ['error']
    }),
    UserModule,
    PostModule,
    InteractionModule,
    CommentModule,
    TopicsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
