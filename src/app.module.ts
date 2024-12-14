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
import { AuthModule } from './auth/auth.module';
import { WebsocketsModule } from './websockets/websockets.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env.development.local' }),
    TypeOrmModule.forFeature(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: 3307,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASS,
      database: process.env.DATABASE_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      autoLoadEntities: true,
      synchronize: true,
    }),
    UserModule,
    PostModule,
    InteractionModule,
    CommentModule,
    TopicsModule,
    AuthModule,
    WebsocketsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
