import { Module } from '@nestjs/common';
// Config env files
import { configEnvDB } from '@/config';
// Modules from my app
import { CommentModule } from '@/comment/comment.module';
import { InteractionModule } from '@/interaction/interaction.module';
import { PostModule } from '@/post/post.module';
import { UserModule } from '@/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TopicsModule } from '@/topics/topics.module';
import { AuthModule } from '@/auth/auth.module';
import { WebsocketsModule } from '@/websockets/websockets.module';

@Module({
  imports: [
    TypeOrmModule.forFeature(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: configEnvDB.hostDB,
      port: parseInt(configEnvDB.portDB),
      username: configEnvDB.usernameDB,
      password: configEnvDB.passDB,
      database: configEnvDB.nameDB,
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
})
export class AppModule {}
